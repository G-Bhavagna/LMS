package com.coders.lmsDemo.controller;

import com.coders.lmsDemo.dto.Assignmentdto;
import com.coders.lmsDemo.dto.CourseAssignmentsDto;
import com.coders.lmsDemo.dto.CourseDto;
import com.coders.lmsDemo.enitities.Course;
import com.coders.lmsDemo.enitities.CourseAssignments;
import com.coders.lmsDemo.enitities.Submission;
import com.coders.lmsDemo.enitities.User;
import com.coders.lmsDemo.mapper.AssignmentMapper;
import com.coders.lmsDemo.mapper.CourseAssignmentMapper;
import com.coders.lmsDemo.mapper.CourseMapper;
import com.coders.lmsDemo.service.AssignmentService;
import com.coders.lmsDemo.service.CourseService;
import com.coders.lmsDemo.service.SubmissionService;
import com.coders.lmsDemo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/courses/assignments")
@AllArgsConstructor
public class AssignmentController {

    private final UserService userService;
    private final SubmissionService submissionService;
    AssignmentService assignmentService;
    CourseService courseService;

    @GetMapping("/getAssignments/{courseCode}")
    public ResponseEntity<List<CourseAssignmentsDto>> getAssignments(@PathVariable String courseCode){
        Course course = courseService.findByCourseCode(courseCode);
        if(course != null){
            List<CourseAssignments> assignments = course.getAssignments();
            List<CourseAssignmentsDto> courseAssignmentsDtos = new ArrayList<>();
            for(CourseAssignments assignment: assignments){
                CourseAssignmentsDto courseAssignmentsDto = CourseAssignmentMapper.toCourseAssignmentsDto(assignment);
                courseAssignmentsDtos.add(courseAssignmentsDto);

            }
            return ResponseEntity.ok().body(courseAssignmentsDtos);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/getAssignmentById/{id}")
    public ResponseEntity<Assignmentdto> getAssignmentById(@PathVariable Long id){
        CourseAssignments assignments = assignmentService.findById(id);
        Assignmentdto s = AssignmentMapper.getAssignment(assignments);
        return ResponseEntity.ok().body(s);
    }

    @GetMapping("/getSubmittedAssignmentsCount/{userId}/{courseCode}")
    public ResponseEntity<Integer> getSubmittedAssignmentsCount(@PathVariable Long userId, @PathVariable String courseCode){
        Course course = courseService.findByCourseCode(courseCode);
        User user=userService.getById(userId);

        Set<Submission> submission=submissionService.getSubmittedAssignmentsByStudent(userId,courseCode);

        return ResponseEntity.ok(submission.size());
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

    @PutMapping("/updateAssignment/{courseCode}/{assignment_id}")
    public ResponseEntity<CourseAssignmentsDto> updateAssignment(@PathVariable String courseCode, @PathVariable Long assignment_id, @RequestBody CourseAssignments assignment) {
        // Retrieve the existing assignment from the database using its ID
        CourseAssignments existingAssignment = assignmentService.findById(assignment_id);
        // Retrieve the course using its course code
        Course course = courseService.findByCourseCode(courseCode);

        if (existingAssignment != null && course != null) {
            // Update the properties of the existing assignment with the new values
            existingAssignment.setAssignmentName(assignment.getAssignmentName());
            existingAssignment.setAssignment_description(assignment.getAssignment_description());
            // Save the updated assignment to the database
            assignmentService.addAssignment(existingAssignment);

            // Optionally, you can return a DTO containing the updated assignment information
            CourseAssignmentsDto updatedAssignmentDto = CourseAssignmentMapper.toCourseAssignmentsDto(existingAssignment);
            return ResponseEntity.ok(updatedAssignmentDto);
        } else {
            // Handle the case where either the assignment or the course does not exist
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteAssignment/{courseCode}/{assign_id}")
    public ResponseEntity<String> deleteAssignment(@PathVariable String courseCode, @PathVariable Long assign_id) {
        Course course = courseService.findByCourseCode(courseCode);
        CourseAssignments assignment = assignmentService.findById(assign_id);
        if(course != null){
            course.getAssignments().remove(assignment);
            assignmentService.deleteAssignment(assignment);
            courseService.addCourse(course);
            return ResponseEntity.ok().body("Assignment deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }





}
