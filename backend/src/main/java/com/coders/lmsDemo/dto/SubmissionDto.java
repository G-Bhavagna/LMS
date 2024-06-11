package com.coders.lmsDemo.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SubmissionDto {
    private Long id;

    private String assignment_name;
    private String student_name;
    private String course_name;
    private byte[] data;
    private Boolean is_graded;
    private String status;
}
