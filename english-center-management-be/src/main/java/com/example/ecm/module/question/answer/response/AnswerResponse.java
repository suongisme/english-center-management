package com.example.ecm.module.question.answer.response;

import com.example.ecm.module.question.answer.AnswerEntity;
import lombok.Data;

@Data
public class AnswerResponse {

    private Long id;
    private String title;
    private Long questionId;
    private Boolean correct;

    public static AnswerResponse from(AnswerEntity entity) {
        AnswerResponse answerResponse = new AnswerResponse();
        answerResponse.setId(entity.getId());
        answerResponse.setTitle(entity.getTitle());
        answerResponse.setQuestionId(entity.getQuestionId());
        answerResponse.setCorrect(entity.getCorrect());
        return answerResponse;
    }
}
