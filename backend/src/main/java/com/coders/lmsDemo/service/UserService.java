package com.coders.lmsDemo.service;

import com.coders.lmsDemo.enitities.Course;
import com.coders.lmsDemo.enitities.User;
import com.coders.lmsDemo.repositories.CourseRepository;
import com.coders.lmsDemo.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class UserService {


    private final UserRepository userRepository;
    private final CourseRepository courseRepository;


    public User getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User getById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }


    public List<User> getAll() {
            return userRepository.findAll();
    }

    public boolean validate(String password, User tempUser) {
        User user=userRepository.findByEmail(tempUser.getEmail());
        return user.getPassword().equals(password);
    }

    public Set<Course> getEnrolledCourses(Long userId) {
        User user= getById(userId);
        return user.getCourses();
    }

    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    public User updateUser(User updatedUser) {
        return userRepository.save(updatedUser);

    }

    public List<User> getAllFaculties() {
        return userRepository.getByRole("faculty");
    }
}
