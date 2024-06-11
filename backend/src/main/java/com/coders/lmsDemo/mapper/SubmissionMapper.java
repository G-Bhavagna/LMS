package com.coders.lmsDemo.mapper;

import com.coders.lmsDemo.dto.SubmissionDto;
import com.coders.lmsDemo.enitities.Submission;

public class SubmissionMapper {

    public static SubmissionDto convertSubmission(Submission submission) {
        SubmissionDto submission1 = new SubmissionDto();
        submission1.setId(submission.getId());
        submission1.setData(submission.getData());
        submission1.setIs_graded(submission.getIs_graded());
        submission1.setStatus(submission.getStatus());
        return submission1;

    }
}
