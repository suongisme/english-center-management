package com.example.ecm.module.checkin.response;

import org.springframework.beans.factory.annotation.Value;

public interface IGetStudentAndCheckinResultResponse {
    Long getId();

    @Value("#{target.lastName + ' ' + target.firstName}")
    String getName();

    Boolean getPresent();

    String getNote();
}
