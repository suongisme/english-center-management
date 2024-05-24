package com.example.ecm.module.timetable.response;

import org.springframework.beans.factory.annotation.Value;

public interface ISearchTimetableResponse {
    Integer getId();

    Integer getStatus();

    String getCourseName();

    String getClassRoomName();

    @Value("#{target.firstName + ' ' + target.lastName}")
    String getTeacherName();
}
