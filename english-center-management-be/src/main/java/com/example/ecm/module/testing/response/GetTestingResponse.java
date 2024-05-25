package com.example.ecm.module.testing.response;

import com.example.ecm.module.question.response.ISearchQuestionResponse;
import com.example.ecm.module.testing.TestingEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class GetTestingResponse {
    private Long id;
    private String name;
    private Date createdDate;
    private String createdBy;
    private Integer status;
    private Long courseId;
    private Integer minimumScore;
    private List<ISearchQuestionResponse> questions;

    public GetTestingResponse(TestingEntity testing) {
        this.id = testing.getId();
        this.name = testing.getName();
        this.createdBy = testing.getCreatedBy();
        this.createdDate = testing.getCreatedDate();
        this.status = testing.getStatus();
        this.courseId = testing.getCourseId();
        this.minimumScore = testing.getMinimumScore();
    }
}
