package com.example.ecm.module.user.response;

import org.springframework.data.web.ProjectedPayload;

import java.util.Date;

@ProjectedPayload
public interface ISearchUserResponse {
    Long getId();

    String getFirstName();

    String getLastName();

    Integer getStatus();

    String getPhone();

    String getEmail();

    String getAddress();

    Date getDob();

    String getRole();

    String getUsername();
}
