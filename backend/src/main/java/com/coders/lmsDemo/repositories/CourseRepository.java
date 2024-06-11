package com.coders.lmsDemo.repositories;

import com.coders.lmsDemo.enitities.Course;
import com.coders.lmsDemo.enitities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    Course findByCourseCode(String courseCode);

    @Query("SELECT u FROM User u JOIN u.courses c WHERE c.courseCode = :courseCode AND u.role = 'student'")
    Set<User> findStudentOfCourse(@Param("courseCode") String courseCode);
}
