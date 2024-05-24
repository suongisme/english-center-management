package com.example.ecm.module.timetable.response;

import com.example.ecm.module.timetable.TimetableEntity;
import com.example.ecm.module.timetable.detail.response.IGetTimetableDetailResponse;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class GetTimetableResponse {
    private Long id;
    private Long courseId;
    private Long classRoomId;
    private Integer status;
    private Long teacherId;
    private Date createdDate;
    private String createdBy;
    private List<Long> students;
    private List<IGetTimetableDetailResponse> details;

    public static GetTimetableResponse from(TimetableEntity entity) {
        GetTimetableResponse getTimetableResponse = new GetTimetableResponse();
        getTimetableResponse.setId(entity.getId());
        getTimetableResponse.setCourseId(entity.getCourseId());
        getTimetableResponse.setStatus(entity.getStatus());
        getTimetableResponse.setCreatedBy(entity.getCreatedBy());
        getTimetableResponse.setClassRoomId(entity.getClassRoomId());
        getTimetableResponse.setCreatedDate(entity.getCreatedDate());
        getTimetableResponse.setTeacherId(entity.getTeacherId());
        return getTimetableResponse;
    }
}
