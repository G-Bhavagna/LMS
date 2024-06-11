package com.coders.lmsDemo.controller;


import com.coders.lmsDemo.dto.CourseDto;
import com.coders.lmsDemo.dto.UserDto;
import com.coders.lmsDemo.enitities.Course;
import com.coders.lmsDemo.enitities.User;
import com.coders.lmsDemo.mapper.CourseMapper;
import com.coders.lmsDemo.mapper.UserMapper;
import com.coders.lmsDemo.service.CourseService;
import com.coders.lmsDemo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final CourseService courseService;


    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User tempUser=userService.getByEmail(user.getEmail());

        if(tempUser==null) {
            user.setRole("student");
            User savedUser=userService.save(user);
            UserDto userDto=UserMapper.toDto(user);

          //  savedUser.setRole("student");
            return  ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
        else{

            return ResponseEntity.status(HttpStatus.CONFLICT).body(tempUser);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody User user) {
        User tempUser=userService.getByEmail(user.getEmail());
        if(tempUser==null) {
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        else{
            String password=user.getPassword();
            boolean yes=userService.validate(password,tempUser);
            if(yes) {
                UserDto userDto=UserMapper.toDto(tempUser);
                return  ResponseEntity.status(HttpStatus.OK).body(userDto);
            }
            else{
                return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        }

    }



    @GetMapping("/coursesEnrolled/{userId}")
    public ResponseEntity<List<CourseDto>> coursesEnrolled(@PathVariable Long userId) {
        User user=userService.getById(userId);
        List<CourseDto> courses=new ArrayList<>();

        for(Course course:user.getCourses()) {
            CourseDto courseDto= CourseMapper.getCourse(course);
            courses.add(courseDto);
        }
        courses.sort((x, y) -> {
            return x.getName().compareTo(y.getName());
        });
        return ResponseEntity.status(HttpStatus.OK).body(courses);
    }

    @GetMapping("/userById/{userId}")
    public ResponseEntity<UserDto> userById(@PathVariable Long userId) {
        User user=userService.getById(userId);
        UserDto userDto=UserMapper.toDto(user);
        return ResponseEntity.status(HttpStatus.OK).body(userDto);
    }

    @GetMapping("/faculties")
    public ResponseEntity<List<UserDto>> faculties() {
        List<User> users=userService.getAllFaculties();
        List<UserDto> userDtos=new ArrayList<>();
        for(User user:users){
            UserDto userDto=UserMapper.toDto(user);
            userDtos.add(userDto);
        }
        return ResponseEntity.status(HttpStatus.OK).body(userDtos);
    }




}
