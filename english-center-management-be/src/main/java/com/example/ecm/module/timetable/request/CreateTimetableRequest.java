package com.example.ecm.module.timetable.request;

import com.example.ecm.module.timetable.TimetableEntity;
import com.example.ecm.module.timetable.detail.request.CreateTimetableDetailRequest;
import com.example.ecm.module.timetable.student.request.CreateTimetableStudentRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

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
    @Size(min = 1)
    @Valid
    private List<CreateTimetableDetailRequest> details;
    private List<CreateTimetableStudentRequest> students;

    public TimetableEntity toEntity() {
        TimetableEntity timetableEntity = new TimetableEntity();
        timetableEntity.setClassRoomId(this.getClassRoomId());
        timetableEntity.setCourseId(this.getCourseId());
        timetableEntity.setTeacherId(this.getTeacherId());
        return timetableEntity;
    }
}
