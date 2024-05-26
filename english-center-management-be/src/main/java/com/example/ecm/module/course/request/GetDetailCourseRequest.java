package com.example.ecm.module.course.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class GetDetailCourseRequest {

    @NotNull
    private Long id;
    private Integer status;
}
