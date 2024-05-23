package com.example.ecm.module.timetable.gradebook.response;

import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

public interface ISearchGradeBookResponse {
    Long getId();
    String getClassRoomName();
    String getCourseName();

    @Value("#{target.lastName + ' ' + target.firstName}")
    String getTeacherName();
    Date getCreatedDate();
    String getCreatedBy();
}
