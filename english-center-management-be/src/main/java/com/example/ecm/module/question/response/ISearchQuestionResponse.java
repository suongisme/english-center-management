package com.example.ecm.module.question.response;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.web.ProjectedPayload;

import java.util.Date;

@ProjectedPayload
public interface ISearchQuestionResponse {

    @Value("#{target.question.id}")
    Long getId();

    @Value("#{target.question.title}")
    String getTitle();

    @Value("#{target.question.level}")
    Integer getLevel();

    @Value("#{target.question.status}")
    Integer getStatus();

    Integer getAnswerId();

    String getAnswerTitle();

    @Value("#{target.question.createdDate}")
    Date getCreatedDate();

    @Value("#{target.question.createdBy}")
    String getCreatedBy();

    @Value("#{target.question.score}")
    Integer getScore();
}
