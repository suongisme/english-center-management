package com.example.ecm.module.timetable.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.web.ProjectedPayload;

import java.time.LocalTime;

@ProjectedPayload
public interface IUserTimetableResponse {

    Integer getId();

    Integer getDay();

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    LocalTime getStartTime();

    Integer getCourseDuration();

    Integer getStatus();

    String getCourseName();

    String getClassRoomName();

    @Value("#{target.firstName + ' ' + target.lastName}")
    String getTeacherName();

}
