package com.coders.lmsDemo.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CourseDto {

    private Long id;

    private String name;
    private String courseCode;
    private String description;
    private String courseUrl;
    private String courseTeacher;
}
