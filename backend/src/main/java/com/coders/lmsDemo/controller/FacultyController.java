package com.coders.lmsDemo.controller;

import com.coders.lmsDemo.dto.Assignmentdto;
import com.coders.lmsDemo.dto.CourseAssignmentsDto;
import com.coders.lmsDemo.dto.CourseDto;
import com.coders.lmsDemo.enitities.Course;
import com.coders.lmsDemo.enitities.CourseAssignments;
import com.coders.lmsDemo.enitities.User;
import com.coders.lmsDemo.mapper.AssignmentMapper;
import com.coders.lmsDemo.mapper.CourseAssignmentMapper;
import com.coders.lmsDemo.mapper.CourseMapper;
import com.coders.lmsDemo.service.AssignmentService;
import com.coders.lmsDemo.service.CourseService;
import com.coders.lmsDemo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users/faculty")
@AllArgsConstructor
public class FacultyController {

    UserService userService;
    CourseService courseService;
    AssignmentService assignmentService;

//    @PostMapping("/addAssignment/{courseCode}")
//    public ResponseEntity<CourseDto> addAssignment(@PathVariable("courseCode") String courseCode,@RequestBody CourseAssignments courseAssignments){
//        Course course=courseService.findByCourseCode(courseCode);
//        course.getAssignments().add(courseAssignments);
//        courseAssignments.getCourse().
//
//    }



//    @GetMapping("/getAssignments/{courseCode}")
//    public ResponseEntity<List<CourseAssignments>> getAssignments(@PathVariable String courseCode){
//        Course course = courseService.findByCourseCode(courseCode);
//        if(course != null){
//            List<CourseAssignments> assignments = course.getAssignments();
//            return ResponseEntity.ok().body(assignments);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//    }

    @GetMapping("/getAssignmentById/{id}")
    public ResponseEntity<Assignmentdto> getAssignmentById(@PathVariable Long id){
        CourseAssignments assignments = assignmentService.findById(id);
        Assignmentdto s = AssignmentMapper.getAssignment(assignments);
        return ResponseEntity.ok().body(s);
    }

    @PostMapping("/addAssignment/{courseCode}")
    public ResponseEntity<String> addAssignment(@RequestBody CourseAssignments assignment, @PathVariable String courseCode){
        Course course = courseService.findByCourseCode(courseCode);
        if(course != null){
            assignment.setCourse(course);
            course.getAssignments().add(assignment);
            assignmentService.addAssignment(assignment);
            courseService.addCourse(course);
            return ResponseEntity.ok().body("Assignment added successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
        }
    }

    @GetMapping("/mycourses/{userId}")
    public ResponseEntity<List<CourseDto>> coursesEnrolled(@PathVariable Long userId) {
        User user=userService.getById(userId);
        List<CourseDto> courses=new ArrayList<>();

        for(Course course:user.getCourses()) {
            CourseDto courseDto= CourseMapper.getCourse(course);
            courses.add(courseDto);
        }
        return ResponseEntity.status(HttpStatus.OK).body(courses);
    }



}
