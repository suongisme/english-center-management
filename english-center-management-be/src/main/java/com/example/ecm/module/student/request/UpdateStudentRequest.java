package com.example.ecm.module.student.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateStudentRequest extends CreateStudentRequest {

    @NotNull
    private Long id;
}
