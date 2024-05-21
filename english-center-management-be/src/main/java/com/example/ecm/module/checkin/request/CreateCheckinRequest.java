package com.example.ecm.module.checkin.request;

import com.example.ecm.module.checkin.CheckinEntity;
import com.example.ecm.module.checkin.student.request.CreateCheckinStudentRequest;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class CreateCheckinRequest {

    @NotNull
    private Long timetableId;

    @NotNull
    @Size(min = 1)
    private List<CreateCheckinStudentRequest> details;

    public CheckinEntity toEntity() {
        CheckinEntity checkin = new CheckinEntity();
        checkin.setTimetableId(this.getTimetableId());
        return checkin;
    }
}
