package com.example.ecm.module.user.response;

import org.springframework.beans.factory.annotation.Value;

public interface IStudentTimetableResponse {

    Integer getId();

    @Value("#{target.lastName + ' ' + target.firstName}")
    String getName();

    Boolean getAbsent();

    String getNote();

}
