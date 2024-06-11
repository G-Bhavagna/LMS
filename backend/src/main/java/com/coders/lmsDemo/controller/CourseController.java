package com.coders.lmsDemo.controller;


import com.coders.lmsDemo.dto.CourseDto;
import com.coders.lmsDemo.dto.UserDto;
import com.coders.lmsDemo.enitities.Course;
import com.coders.lmsDemo.enitities.Submission;
import com.coders.lmsDemo.enitities.User;
import com.coders.lmsDemo.mapper.CourseMapper;
import com.coders.lmsDemo.mapper.UserMapper;
import com.coders.lmsDemo.repositories.CourseRepository;
import com.coders.lmsDemo.repositories.UserRepository;
import com.coders.lmsDemo.service.CourseService;
import com.coders.lmsDemo.service.SubmissionService;
import com.coders.lmsDemo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final UserService userService;
    private final CourseRepository courseRepository;
    private final SubmissionService submissionService;

    @GetMapping("/allCourses")
    public ResponseEntity<List<CourseDto>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        List<CourseDto>  courseDtos=new ArrayList<>();
        for(Course course : courses){
            CourseDto courseDto =CourseMapper.getCourse(course);
            courseDtos.add(courseDto);
        }
        return new ResponseEntity<>(courseDtos, HttpStatus.OK);
    }
//    @GetMapping("/all/{userId}")
//    public String getAllCoursesOfUser(@PathVariable Long userId, Model model) {
//        List<Course> courses = courseService.getCoursesNotEnrolledByUser(userId);
//        model.addAttribute("courses", courses);
//        return "courses";
//    }

    @GetMapping("/coursesForFaculty/{user_Id}")
    public ResponseEntity<List<CourseDto>> getCoursesForFaculty(@PathVariable Long user_Id){
        List<CourseDto> courseAssignmentsDtos = new ArrayList<>();
        User user = userService.getById(user_Id);
        Set<Course> courses = user.getCourses();
        for(Course course: courses){
            CourseDto temp= CourseMapper.getCourse(course);
            courseAssignmentsDtos.add(temp);
        }
        return ResponseEntity.ok().body(courseAssignmentsDtos);
    }

    @GetMapping("/allUsersOfCourse/{courseCode}")
    public ResponseEntity<List<UserDto>> getAllUsersOfCourse(@PathVariable String courseCode){
        Course course=courseService.findByCourseCode(courseCode);
        List<UserDto> userDtos=new ArrayList<>();
        Set<User> users=course.getUser();
        for(User user: users){
            if(user.getRole().equals("student")){
                UserDto userDto= UserMapper.toDto(user);
                userDtos.add(userDto);
            }
        }
        return ResponseEntity.ok().body(userDtos);
    }


    @PostMapping("/addCourse")
    public ResponseEntity<Course> addCourse(@RequestBody Course course) {
        Course checkCourse = courseService.findByCourseCode(course.getCourseCode());
        if(checkCourse == null) {
           Course savedCourse= courseService.addCourse(course);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCourse);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/enrollCourse/{userId}/{course_code}")
    @ResponseBody
    public ResponseEntity<String> enrollCourse(@PathVariable Long userId, @PathVariable String course_code) {
        String message = courseService.enrollStudentinCourse(userId, course_code);
        if (message.equals("Enrolled successfully")) {
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } else if (message.equals("Already enrolled in this course")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
        }
    }

//    public Set<Student> getStudentsByCourseId(Long courseId) {
//        Optional<Course> courseOptional = courseRepository.findById(courseId);
//        if (courseOptional.isPresent()) {
//            return courseOptional.get().getStudents();
//        } else {
//            return new HashSet<>();
//        }
//    }

    @GetMapping("/usersByCourse/{courseCode}")
    public ResponseEntity<List<String>> getEnrolledUsersByCourse(@PathVariable String courseCode) {
        Set<User> userEnrolled = courseService.getUsersEnrolledByCourse(courseCode);
        List<String> temp=new ArrayList<>();
        for(User user:userEnrolled){
            temp.add(user.getUsername());
        }
        return ResponseEntity.status(HttpStatus.OK).body(temp);
    }


    //update course
    @PutMapping("/updateCourse/{courseCode}")
    public ResponseEntity<Course> updateCourse(@PathVariable String courseCode, @RequestBody Course course) {
        Course checkCourse = courseService.findByCourseCode(courseCode);
        courseService.updateCourse(checkCourse,course);
        return ResponseEntity.status(HttpStatus.OK).body(course);
    }

    @GetMapping("/getCourseByCourseCode/{courseCode}")
    public ResponseEntity<Course> getCourseByCourseCode(@PathVariable String courseCode) {
        Course course = courseService.findByCourseCode(courseCode);
        return ResponseEntity.status(HttpStatus.OK).body(course);
    }


    @GetMapping("/coursesNotenrolled/{userId}")
    public ResponseEntity<List<CourseDto>> coursesUnenrolled(@PathVariable Long userId) {
        // Fetch all courses
        List<Course> allCourses = courseService.getAllCourses();

        // Fetch courses enrolled by the user
        Set<Course> enrolledCourses = userService.getEnrolledCourses(userId);

        // Filter out courses not enrolled by the user
        allCourses.removeAll(enrolledCourses);

        List<CourseDto> courseDtos=new ArrayList<>();
        for(Course course:allCourses){
            CourseDto courseDto=CourseMapper.getCourse(course);
            courseDtos.add(courseDto);
        }

        return ResponseEntity.ok(courseDtos);
    }


    @DeleteMapping("/unEnrollCourse/{userId}/{courseCode}")
    public ResponseEntity<CourseDto> unenrollCourse(@PathVariable Long userId, @PathVariable String courseCode) {
        Course course = courseService.findByCourseCode(courseCode);
        User user = userService.getById(userId);

        if (course != null && user != null) {
            // Find and remove the student's submissions for the course
            Set<Submission> submissions = submissionService.getSubmittedAssignmentsByStudent(userId, courseCode);
            for (Submission submission : submissions) {
                submissionService.delete(submission);
            }

            // Unenroll the student from the course
            course.getUser().remove(user);
            user.getCourses().remove(course);

            // Save the updated user and course entities
            userService.save(user);
            courseService.addCourse(course);

            // Create the response DTO
            CourseDto courseDto = CourseMapper.getCourse(course);
            return ResponseEntity.status(HttpStatus.OK).body(courseDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @GetMapping("/enrollmentCount")
    public ResponseEntity<Map<String,Integer>> getEnrollmentCount() {
        List<Course> allCourses = courseService.getAllCourses();
        Map<String,Integer> map=new LinkedHashMap<>();
        for(Course course:allCourses){
            Set<User> users=courseService.findStudentsOfCourse(course.getCourseCode());
            map.put(course.getCourseCode(),users.size());
        }
        return ResponseEntity.status(HttpStatus.OK).body(map);

    }



}
