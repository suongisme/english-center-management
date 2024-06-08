package com.example.ecm.module.checkin.student.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateCheckinStudentRequest {

    @NotNull
    private Long studentId;

    @NotNull
    private Boolean present;

    @Size(max = 255)
    private String note;
}
