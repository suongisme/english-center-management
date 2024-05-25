package com.example.ecm.module.testing.response;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.web.ProjectedPayload;

import java.util.Date;

@ProjectedPayload
public interface ISearchTestingResponse {
    @Value("#{target.testing.id}")
    Long getId();

    @Value("#{target.testing.name}")
    String getName();

    @Value("#{target.testing.courseId}")
    Long getCourseId();
    String getCourseName();

    @Value("#{target.testing.createdDate}")
    Date getCreatedDate();

    @Value("#{target.testing.createdBy}")
    String getCreatedBy();

    @Value("#{target.testing.status}")
    Integer getStatus();

    Integer getQuestionSize();

    @Value("#{target.testing.minimumScore}")
    Integer getMinimumScore();
}
