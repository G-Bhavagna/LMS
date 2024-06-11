package com.coders.lmsDemo.mapper;

import com.coders.lmsDemo.dto.CourseDto;
import com.coders.lmsDemo.enitities.Course;

public class CourseMapper {
    public static CourseDto getCourse(Course course) {
        CourseDto courseDto = new CourseDto();
        courseDto.setId(course.getId());
        courseDto.setName(course.getName());
        courseDto.setCourseCode(course.getCourseCode());
        courseDto.setDescription(course.getDescription());
        courseDto.setCourseUrl(course.getCourseUrl());
        courseDto.setCourseTeacher(course.getCourseTeacher());
        return courseDto;

    }
}
