package com.example.ecm.module.timetable.gradebook.response;

import org.springframework.beans.factory.annotation.Value;

public interface IGetStatisticScoreResponse {
    Long getId();

    @Value("#{target.lastName + ' ' + target.firstName}")
    String getStudentName();

    Long getTotalLesson();

    Long getTotalAbsent();

    Long getTotalPresent();

    Long getScore();

}
