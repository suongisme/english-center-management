package com.example.ecm.module.timetable.request;

import com.example.ecm.module.timetable.TimetableEntity;
import com.example.ecm.module.timetable.student.request.CreateTimetableStudentRequest;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalTime;
import java.util.List;

@Data
public class CreateTimetableRequest {

    @NotNull
    private Long teacherId;

    @NotNull
    private Long courseId;

    @NotNull
    private Long classRoomId;

    @NotNull
    private LocalTime startTime;

    @NotNull
    @Min(2)
    @Max(8)
    private Integer day;

    @NotNull
    private Integer status;

    private List<CreateTimetableStudentRequest> students;

    public TimetableEntity toEntity() {
        TimetableEntity timetableEntity = new TimetableEntity();
        timetableEntity.setDay(this.getDay());
        timetableEntity.setStartTime(this.getStartTime());
        timetableEntity.setStatus(this.getStatus());
        timetableEntity.setClassRoomId(this.getClassRoomId());
        timetableEntity.setCourseId(this.getCourseId());
        timetableEntity.setTeacherId(this.getTeacherId());
        return timetableEntity;
    }
}
