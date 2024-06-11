package com.coders.lmsDemo.enitities;

import com.coders.lmsDemo.enitities.Course;
import com.coders.lmsDemo.enitities.CourseAssignments;
import com.coders.lmsDemo.enitities.User;
import jakarta.persistence.*;


import jakarta.persistence.*;

@Entity
@Table(name = "submissions")
public class Submission {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "assignment_id")
    private CourseAssignments assignment;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] data;

    private Boolean is_graded=false;

    private String status;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public CourseAssignments getAssignment() {
        return assignment;
    }

    public void setAssignment(CourseAssignments assignment) {
        this.assignment = assignment;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public Boolean getIs_graded() {
        return is_graded;
    }

    public void setIs_graded(Boolean is_graded) {
        this.is_graded = is_graded;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
