package com.coders.lmsDemo.service;

import com.coders.lmsDemo.enitities.CourseAssignments;
import com.coders.lmsDemo.repositories.AssignmentRepository;
import com.coders.lmsDemo.repositories.CourseRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    @Transactional
    public void addAssignment(CourseAssignments courseAssignments) {
        assignmentRepository.save(courseAssignments);

    }

    public CourseAssignments getById(Long assignmentId) {
       return assignmentRepository.findById(assignmentId).get();
    }

    public CourseAssignments findById(Long id) {
        return assignmentRepository.findById(id).get();
    }

    public void deleteAssignment(CourseAssignments assignment) {
        assignmentRepository.delete(assignment);
    }
}
