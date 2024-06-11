package com.coders.lmsDemo.enitities;


import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name="course_assignments")
public class CourseAssignments {

    @Id
    @GeneratedValue
    private Long id;

    private String assignmentName;
    private String assignment_description;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course courses;

    @OneToMany(mappedBy = "assignment")
    private Set<Submission> submissions;


    public String getAssignmentName() {
        return assignmentName;
    }

    public void setAssignmentName(String assignmentName) {
        this.assignmentName = assignmentName;
    }

    public String getAssignment_description() {
        return assignment_description;
    }

    public void setAssignment_description(String assignment_description) {
        this.assignment_description = assignment_description;
    }

    public Course getCourses() {
        return courses;
    }

    public void setCourses(Course courses) {
        this.courses = courses;
    }

    public Course getCourse() {
        return courses;
    }

    public void setCourse(Course course) {
        this.courses = course;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
