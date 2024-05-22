package com.example.ecm.module.checkin.request;

import lombok.Data;

import java.util.Date;

@Data
public class SearchCheckinRequest {
    private Long courseId;
    private Long classRoomId;
    private Date checkinDate;
    private Long teacherId;
}
