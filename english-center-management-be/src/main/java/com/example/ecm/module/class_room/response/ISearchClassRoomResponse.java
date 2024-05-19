package com.example.ecm.module.class_room.response;

import org.springframework.data.web.ProjectedPayload;

import java.util.Date;

@ProjectedPayload
public interface ISearchClassRoomResponse {
    Long getId();

    String getName();

    Integer getPosition();

    Integer getSize();

    Integer getStatus();

    Date getCreatedDate();

    String getCreatedBy();
}
