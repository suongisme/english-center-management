package com.example.ecm.module.course.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class UpdateCourseRequest extends CreateCourseRequest {

    @NotNull
    private Long id;
}
