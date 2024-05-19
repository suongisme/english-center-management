package com.example.ecm.module.timetable.response;

import com.example.ecm.module.timetable.TimetableEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Data
public class GetTimetableResponse {
    private Long id;
    private Long courseId;
    private Long classRoomId;
    private Integer status;
    private Long teacherId;
    private List<Long> students;
    private Date createdDate;
    private String createdBy;
    private Integer day;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime startTime;

    public static GetTimetableResponse from(TimetableEntity entity) {
        GetTimetableResponse getTimetableResponse = new GetTimetableResponse();
        getTimetableResponse.setId(entity.getId());
        getTimetableResponse.setDay(entity.getDay());
        getTimetableResponse.setCourseId(entity.getCourseId());
        getTimetableResponse.setStatus(entity.getStatus());
        getTimetableResponse.setCreatedBy(entity.getCreatedBy());
        getTimetableResponse.setClassRoomId(entity.getClassRoomId());
        getTimetableResponse.setCreatedDate(entity.getCreatedDate());
        getTimetableResponse.setStartTime(entity.getStartTime());
        getTimetableResponse.setTeacherId(entity.getTeacherId());
        return getTimetableResponse;
    }
}
