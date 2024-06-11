package com.coders.lmsDemo.repositories;

import com.coders.lmsDemo.enitities.CourseAssignments;
import com.coders.lmsDemo.enitities.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<CourseAssignments, Long> {

}
