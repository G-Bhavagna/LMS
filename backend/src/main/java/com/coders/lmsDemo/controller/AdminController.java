package com.coders.lmsDemo.controller;

import com.coders.lmsDemo.dto.CourseDto;
import com.coders.lmsDemo.dto.UserDto;
import com.coders.lmsDemo.enitities.Course;
import com.coders.lmsDemo.enitities.User;
import com.coders.lmsDemo.mapper.CourseMapper;
import com.coders.lmsDemo.mapper.UserMapper;
import com.coders.lmsDemo.repositories.CourseRepository;
import com.coders.lmsDemo.repositories.UserRepository;
import com.coders.lmsDemo.service.CourseService;
import com.coders.lmsDemo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@RestController
@RequestMapping("/api/lms/admin")
public class AdminController {

    private final UserService userService;
    private final CourseService courseService;

    @PostMapping("/addUser")
    public ResponseEntity<UserDto> addUser(@RequestBody  UserDto user) {
        User teacher = UserMapper.dtoToUser(user);
        teacher.setRole(user.getRole());
        User savedUser=userService.save(teacher);
        UserDto userDto = UserMapper.toDto(savedUser);
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/getUserById/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId) {
        return ResponseEntity.ok(UserMapper.toDto(userService.getById(userId)));
    }

    @PutMapping("/updateUser/{userId}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long userId, @RequestBody UserDto user) {
//        User tempuser=userService.getById(userId);
        User updatedUser = UserMapper.dtoToUser(user);
        User savedUser=userService.updateUser(updatedUser);
        if(savedUser!=null) return ResponseEntity.ok(UserMapper.toDto(savedUser));
        else return ResponseEntity.ok(null);

    }


    @GetMapping("/allCourses")
    public ResponseEntity<List<CourseDto>> getAllCourses() {
        List<Course> courses=  courseService.getAllCourses();
        List<CourseDto> courseDtos=new ArrayList<>();
        for(Course course:courses){
            courseDtos.add(CourseMapper.getCourse(course));
        }
        return ResponseEntity.ok(courseDtos);

    }

    @PostMapping("/assignCourse/{fac_id}/{courseCode}")
    public ResponseEntity<UserDto> assignCourse(@PathVariable String courseCode, @PathVariable Long fac_id) {
        User user=userService.getById(fac_id);
        Course course=courseService.findByCourseCode(courseCode);

        user.getCourses().add(course);
        course.getUser().add(user);
        userService.save(user);
        courseService.addCourse(course);
        UserDto userDto = UserMapper.toDto(user);
        return ResponseEntity.ok(userDto);
    }


    @DeleteMapping("/deleteFaculty/{fac_id}")
    public ResponseEntity<UserDto> deleteTeacher(@PathVariable Long fac_id) {
        User user=userService.getById(fac_id);
        Set<Course> mappedCourses=user.getCourses();
        for(Course course:mappedCourses){
            Course course1=courseService.findByCourseCode(course.getCourseCode());
            course1.getUser().remove(user);
            user.getCourses().remove(course1);
        }
        userService.deleteUser(user);
        return ResponseEntity.ok(UserMapper.toDto(user));
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAll() {
        List<User> users = userService.getAll();
        List<UserDto> userDtos = new ArrayList<>();
        for(User user : users) {
            userDtos.add(UserMapper.toDto(user));
        }
        return ResponseEntity.ok(userDtos);
    }


}
