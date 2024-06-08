package com.example.ecm.module.user.response;

import org.springframework.beans.factory.annotation.Value;

public interface IGetStatisticUserResponse {
    Long getId();

    @Value("#{target.lastName + ' ' + target.firstName}")
    String getStudentName();

    Long getTotalPresent();

    Long getTotalAbsent();

    Long getTotalCourse();
}
