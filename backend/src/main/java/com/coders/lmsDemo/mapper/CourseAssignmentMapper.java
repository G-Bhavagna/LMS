package com.coders.lmsDemo.mapper;

import com.coders.lmsDemo.dto.CourseAssignmentsDto;
import com.coders.lmsDemo.enitities.CourseAssignments;

public class CourseAssignmentMapper {
    public static CourseAssignmentsDto toCourseAssignmentsDto(CourseAssignments courseAssignments) {
        CourseAssignmentsDto courseAssignmentsDto = new CourseAssignmentsDto();
        courseAssignmentsDto.setId(courseAssignments.getId());
        courseAssignmentsDto.setAssignmentName(courseAssignments.getAssignmentName());
        courseAssignmentsDto.setAssignment_description(courseAssignments.getAssignment_description());
        return courseAssignmentsDto;
    }
}
