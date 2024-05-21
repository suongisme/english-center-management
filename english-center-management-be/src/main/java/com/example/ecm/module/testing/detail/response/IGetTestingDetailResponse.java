package com.example.ecm.module.testing.detail.response;

import org.springframework.data.web.ProjectedPayload;

@ProjectedPayload
public interface IGetTestingDetailResponse {
    Long getId();
    String getQuestionTitle();
    String getAnswer();
}
