package com.example.ecm.module.question.response;

import com.example.ecm.module.question.QuestionEntity;
import com.example.ecm.module.question.answer.response.AnswerResponse;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class GetQuestionResponse {
    private Long id;
    private String title;
    private Integer level;
    private Integer status;
    private Date createdDate;
    private String createdBy;
    private Integer score;
    private List<AnswerResponse> answers;

    public static GetQuestionResponse from(QuestionEntity entity) {
        GetQuestionResponse getQuestionResponse = new GetQuestionResponse();
        getQuestionResponse.setId(entity.getId());
        getQuestionResponse.setTitle(entity.getTitle());
        getQuestionResponse.setLevel(entity.getLevel());
        getQuestionResponse.setStatus(entity.getStatus());
        getQuestionResponse.setCreatedBy(entity.getCreatedBy());
        getQuestionResponse.setCreatedDate(entity.getCreatedDate());
        getQuestionResponse.setScore(entity.getScore());
        return getQuestionResponse;
    }
}
