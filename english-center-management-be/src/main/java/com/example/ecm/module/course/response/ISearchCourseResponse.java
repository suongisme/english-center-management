package com.example.ecm.module.course.response;

import org.springframework.data.web.ProjectedPayload;

import java.math.BigDecimal;
import java.util.Date;

@ProjectedPayload
public interface ISearchCourseResponse {

    Long getId();
    String getName();
    String getDescription();
    Integer getNumberOfLesson();

    Integer getStatus();
    Date getCreatedDate();
    String getCreatedBy();
    BigDecimal getPrice();
    Integer getDiscount();
    Integer getDuration();

    String getAvatarUrl();

    String getShortDescription();

    Date getUpdatedDate();

    String getUpdatedBy();
}
