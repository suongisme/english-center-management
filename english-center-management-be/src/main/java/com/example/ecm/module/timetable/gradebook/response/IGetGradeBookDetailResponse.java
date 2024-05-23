package com.example.ecm.module.timetable.gradebook.response;

import org.springframework.beans.factory.annotation.Value;

public interface IGetGradeBookDetailResponse {

    @Value("#{target.lastName + ' ' + target.firstName}")
    String getName();
    Long getId();
    Long getScore();
    String getNote();
}
