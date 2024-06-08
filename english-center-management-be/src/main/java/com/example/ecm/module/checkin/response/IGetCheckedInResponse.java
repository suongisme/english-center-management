package com.example.ecm.module.checkin.response;

import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

public interface IGetCheckedInResponse {
    Long getId();

    @Value("#{target.lastName + ' ' + target.firstName}")
    String getStudentName();
    Integer getDay();
    String getNote();
    Date getCheckedInDate();
    Boolean getPresent();

    String getCheckedInBy();

}
