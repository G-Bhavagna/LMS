package com.coders.lmsDemo.repositories;

import com.coders.lmsDemo.enitities.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    @Query("SELECT s FROM Submission s WHERE s.user.id = :userId AND s.course.courseCode = :courseCode")
    Set<Submission> findByUserIdAndCourseCode(@Param("userId") Long userId, @Param("courseCode") String courseCode);

    @Query("SELECT s FROM Submission s WHERE s.course.courseCode = :courseCode AND s.assignment.id = :assignmentId")
    Set<Submission> findByCourseCodeAndAssignmentId(@Param("courseCode") String courseCode, @Param("assignmentId") Long assignmentId);

    @Query("select s from Submission  s where s.user.id=:userId and s.course.courseCode=:courseCode and s.assignment.id=:assignmentId")
    Submission isSubmitted(@Param("userId") Long userId,@Param("courseCode") String courseCode,@Param("assignmentId") Long assignmentId);

}

