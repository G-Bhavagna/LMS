package com.coders.lmsDemo.controller;

import com.coders.lmsDemo.dto.SubmissionDto;
import com.coders.lmsDemo.enitities.*;
import com.coders.lmsDemo.mapper.SubmissionMapper;
import com.coders.lmsDemo.repositories.SubmissionRepository;
import com.coders.lmsDemo.service.AssignmentService;
import com.coders.lmsDemo.service.CourseService;
import com.coders.lmsDemo.service.SubmissionService;
import com.coders.lmsDemo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/courses/assignments/submission")
@AllArgsConstructor
public class SubmissionController {

    private final AssignmentService assignmentService;
    SubmissionRepository submissionRepository;
    UserService userService;
    CourseService courseService;
    SubmissionService   submissionService;


    @GetMapping("/checkSubmission/{userId}/{courseCode}/{assignmentId}")
    public ResponseEntity<SubmissionDto> checkSubmission(@PathVariable Long userId, @PathVariable String courseCode, @PathVariable Long assignmentId) {
        Submission submission= submissionRepository.isSubmitted(userId,courseCode,assignmentId);
        if(submission == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        else{
            SubmissionDto submissionDto = SubmissionMapper.convertSubmission(submission);
            return ResponseEntity.ok(submissionDto);
        }
    }

    @PostMapping("/submitAssignment/{userId}/{courseCode}/{assignmentId}")
    public ResponseEntity<Submission> submitAssignment(
            @RequestPart("file") MultipartFile file,
            @PathVariable Long userId,
            @PathVariable String courseCode,
            @PathVariable Long assignmentId) {

        User user = userService.getById(userId);
        Course course = courseService.findByCourseCode(courseCode);
        CourseAssignments assignment = assignmentService.getById(assignmentId);

        if (user == null || course == null || assignment == null || file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // Save file data
        try {
            Submission submission=new Submission();
            byte[] fileData = file.getBytes();
            // Save submission data along with the file
            submission.setUser(user);
            submission.setCourse(course);
            submission.setAssignment(assignment);
            submission.setData(fileData); // Assuming there's a field in Submission entity to store file data
            submission.setStatus("submitted");
            submissionRepository.save(submission);
            return ResponseEntity.ok(submission);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    @GetMapping("/getAllSubmissions/{courseCode}")
    public ResponseEntity<List<SubmissionDto>> getAllSubmissions(@PathVariable String courseCode) {
        Course course = courseService.findByCourseCode(courseCode);
        Set<Submission> submissions = course.getSubmissions();
        List<SubmissionDto> submissionDtos = new ArrayList<>();

        for (Submission submission : submissions) {
            if (!submission.getIs_graded()) {
                SubmissionDto submissionDto = SubmissionMapper.convertSubmission(submission);
                submissionDto.setAssignment_name(submission.getAssignment().getAssignmentName());
                submissionDto.setCourse_name(course.getName());
                User user = submission.getUser();
                submissionDto.setStudent_name(user.getUsername());
                submissionDtos.add(submissionDto);
            }
        }
        return ResponseEntity.ok(submissionDtos);
    }
    @GetMapping("/getFile/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        Submission submission = submissionRepository.findById(id).orElse(null);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"submission\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(submission.getData());
    }


    @GetMapping("/getGradedSubmissions/{courseCode}")
    public ResponseEntity<List<SubmissionDto>> getGradedSubmissions(@PathVariable String courseCode) {
        Course course = courseService.findByCourseCode(courseCode);
        Set<Submission> submissions = course.getSubmissions();
        List<SubmissionDto> submissionDtos = new ArrayList<>();

        for (Submission submission : submissions) {
            if (submission.getIs_graded()) {
                SubmissionDto submissionDto = SubmissionMapper.convertSubmission(submission);
                submissionDto.setAssignment_name(submission.getAssignment().getAssignmentName());
                submissionDto.setData(submission.getData());
                submissionDto.setCourse_name(course.getName());
                User user = submission.getUser();
                submissionDto.setStudent_name(user.getUsername());
                submissionDtos.add(submissionDto);
            }
        }
        return ResponseEntity.ok(submissionDtos);
    }

    @PutMapping("/gradeAssignment/{submissionId}")
    public ResponseEntity<String> gradeAssignment(@PathVariable Long submissionId) {
        Submission submission = submissionRepository.findById(submissionId).orElse(null);
        submission.setIs_graded(true);
        submissionRepository.save(submission);
        return ResponseEntity.ok(submission.getAssignment().getAssignmentName());
    }

    @GetMapping("/submittedAssignments/{userId}/{courseCode}")
    public ResponseEntity<List<String>> getSubmittedAssignmentsByStudent(@PathVariable Long userId, @PathVariable String courseCode) {
        Set<Submission> st = submissionService.getSubmittedAssignmentsByStudent(userId, courseCode);
        List<String> list = new ArrayList<>();
        for (Submission submission : st) {
            list.add(submission.getAssignment().getAssignmentName());
        }
        return ResponseEntity.ok(list);
    }

    @GetMapping("/courseSubmissions/{courseCode}/{assignmentId}")
    public ResponseEntity<List<String>> getCourseSubmission(@PathVariable String courseCode, @PathVariable Long assignmentId) {
        Set<Submission> submissions = submissionService.getSubmissionsByCourseCodeAndAssignmentId(courseCode, assignmentId);
        List<String> usernames = new ArrayList<>();
        for (Submission submission : submissions) {
            usernames.add(submission.getUser().getUsername());
        }
        return ResponseEntity.ok(usernames);
    }






}
