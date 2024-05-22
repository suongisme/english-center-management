package com.example.ecm.module.resource.response;

import org.springframework.data.web.ProjectedPayload;

import java.util.Date;

@ProjectedPayload
public interface ISearchResourceResponse {

    Long getId();

    Long getKeyId();

    String getUrl();

    Date getCreatedDate();

    String getCreatedBy();

    String getType();

    String getFileName();
}
