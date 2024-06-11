package com.coders.lmsDemo.service;

import com.coders.lmsDemo.enitities.Submission;
import com.coders.lmsDemo.enitities.User;
import com.coders.lmsDemo.repositories.SubmissionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@AllArgsConstructor
public class SubmissionService {



    UserService userService;
    CourseService  courseService;
    SubmissionRepository  submissionRepository;

//    SubmissionRepository courseSubmissionRepository;;
//    public long countSubmissionsForAssignment(Long courseId, Long assignmentId) {
//        return courseSubmissionRepository.countByCourseIdAndAssignmentId(courseId, assignmentId);
//    }

    public Set<Submission> getSubmittedAssignmentsByStudent(Long userId,String courseCode) {
        Set<Submission> st=submissionRepository.findByUserIdAndCourseCode(userId,courseCode);
        return st;
    }

    public Set<Submission> getSubmissionsByCourseCodeAndAssignmentId(String courseCode, Long assignmentId) {
        return submissionRepository.findByCourseCodeAndAssignmentId(courseCode, assignmentId);
    }


    public Submission isSubmitted(Long userId, String courseCode, Long assignmentId) {
        return submissionRepository.isSubmitted(userId,courseCode,assignmentId);
    }

    public void delete(Submission submission) {
        submissionRepository.delete(submission);
    }
}
