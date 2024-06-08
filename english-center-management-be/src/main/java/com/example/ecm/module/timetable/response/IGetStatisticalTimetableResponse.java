package com.example.ecm.module.timetable.response;

import org.springframework.beans.factory.annotation.Value;

public interface IGetStatisticalTimetableResponse {
    Long getId();

    String getClassName();

    @Value("#{target.lastName + ' ' + target.firstName}")
    String getTeacherName();

    Long getTotalStudent();

    Integer getStatus();
}
