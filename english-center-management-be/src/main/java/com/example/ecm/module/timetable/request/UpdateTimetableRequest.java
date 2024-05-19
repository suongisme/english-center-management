package com.example.ecm.module.timetable.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class UpdateTimetableRequest extends CreateTimetableRequest {

    @NotNull
    private Long id;
}
