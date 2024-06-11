package com.coders.lmsDemo.service;

import com.coders.lmsDemo.enitities.Course;
import com.coders.lmsDemo.enitities.User;
import com.coders.lmsDemo.repositories.CourseRepository;
import com.coders.lmsDemo.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final UserService userService;




    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }


    public Course findByCourseCode(String courseCode) {
        return courseRepository.findByCourseCode(courseCode);
    }

    public Course getCourseById(Long courseId) {
        return courseRepository.findById(courseId).get();
    }

    public List<Course> getCoursesNotEnrolledByUser(Long userId) {
        User user = userService.getById(userId);
        if (user != null) {
            Set<Course> enrolledCourses = user.getCourses();
            return courseRepository.findAll().stream()
                    .filter(course -> !enrolledCourses.contains(course))
                    .collect(Collectors.toList());
        }
        return courseRepository.findAll(); // Or return an empty list if user is not found
    }
    @Transactional
    public String enrollStudentinCourse(Long userId, String courseCode) {
        User user = userRepository.findById(userId).orElse(null);
        Course course = courseRepository.findByCourseCode(courseCode);

        if (user != null && course != null) {
            Set<Course> enrolledCourses = user.getCourses();
            if (enrolledCourses.contains(course)) {
                return "Already enrolled in this course";
            }
            user.getCourses().add(course);
            userRepository.save(user);
            return "Enrolled successfully";
        }
        return "Enrollment failed";
    }

    public Set<User> getUsersEnrolledByCourse(String courseCode) {
        Course course=courseRepository.findByCourseCode(courseCode);
        return  course.getUser();
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public void updateCourse(Course oldCourse, Course course) {
        oldCourse.setCourseCode(course.getCourseCode());
        oldCourse.setName(course.getName());
        oldCourse.setDescription(course.getDescription());
        oldCourse.setCourseTeacher(course.getCourseTeacher());
        oldCourse.setCourseUrl(course.getCourseUrl());
        oldCourse.setImage(course.getImage());
        courseRepository.save(oldCourse);
    }


    public Set<User> findStudentsOfCourse(String courseCode) {
        return courseRepository.findStudentOfCourse(courseCode);
    }
}
