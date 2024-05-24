package com.example.ecm.module.timetable.request;

import lombok.Data;

@Data
public class SearchTimetableRequest {
    private Long teacherId;
    private Integer status;
    private Long studentId;
    private Boolean scored;
}
