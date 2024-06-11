package com.coders.lmsDemo.enitities;

import jakarta.persistence.*;
import org.hibernate.sql.ast.tree.update.Assignment;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String courseCode;
    private String description;
    private String courseUrl;
    private String courseTeacher;
    @Lob
    private byte[] image;

    @ManyToMany(mappedBy = "courses")
    private Set<User> user=new HashSet<>();

    @OneToMany(mappedBy = "courses")
    private List<CourseAssignments> assignments=new ArrayList<>();

    @OneToMany(mappedBy = "course")
    private Set<Submission> submissions;

    public List<CourseAssignments> getAssignments() {
        return assignments;
    }

    public void setAssignments(List<CourseAssignments> assignments) {
        this.assignments = assignments;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCourseUrl() {
        return courseUrl;
    }

    public void setCourseUrl(String courseUrl) {
        this.courseUrl = courseUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCourseTeacher() {
        return courseTeacher;
    }

    public void setCourseTeacher(String courseTeacher) {
        this.courseTeacher = courseTeacher;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public Set<User> getUser() {
        return user;
    }

    public void setUser(Set<User> user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Set<Submission> getSubmissions() {
        return submissions;
    }

    public void setSubmissions(Set<Submission> submissions) {
        this.submissions = submissions;
    }
}
