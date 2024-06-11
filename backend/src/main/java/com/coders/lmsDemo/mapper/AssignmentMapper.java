package com.coders.lmsDemo.mapper;

import com.coders.lmsDemo.dto.Assignmentdto;
import com.coders.lmsDemo.enitities.CourseAssignments;


public class AssignmentMapper {
    public static Assignmentdto getAssignment(CourseAssignments assignment) {
        Assignmentdto assignmentdto = new Assignmentdto();
        assignmentdto.setId(assignment.getId());
        assignmentdto.setAssignmentName(assignment.getAssignmentName());
        assignmentdto.setAssignment_description(assignment.getAssignment_description());
        return assignmentdto;
    }
}
