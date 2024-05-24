package com.example.ecm.module.timetable.detail.response;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalTime;

public interface IGetTimetableDetailResponse {
    Long getId();
    Integer getDay();

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    LocalTime getStartTime();
}
