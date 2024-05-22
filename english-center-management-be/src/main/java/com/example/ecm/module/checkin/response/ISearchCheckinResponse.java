package com.example.ecm.module.checkin.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.web.ProjectedPayload;

import java.time.LocalTime;
import java.util.Date;

@ProjectedPayload
public interface ISearchCheckinResponse {

    Long getId();

    String getCourseName();

    String getClassRoomName();

    @Value("#{target.lastName + ' ' + target.firstName}")
    String getTeacherName();

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    LocalTime getStartTime();

    Integer getDay();

    Date getCheckinDate();

    String getCreatedBy();
}
