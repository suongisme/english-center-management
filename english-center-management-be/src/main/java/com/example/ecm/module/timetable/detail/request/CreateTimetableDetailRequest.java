package com.example.ecm.module.timetable.detail.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalTime;

@Data
public class CreateTimetableDetailRequest {

    @NotNull
    @Min(2)
    @Max(8)
    private Integer day;

    @NotNull
    private LocalTime startTime;
}
