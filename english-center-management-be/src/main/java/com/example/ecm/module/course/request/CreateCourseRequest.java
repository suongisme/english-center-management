package com.example.ecm.module.course.request;

import com.example.ecm.module.course.CourseEntity;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateCourseRequest {

    @NotBlank
    @Size(max = 255)
    private String name;

    private String description;

    @NotNull
    private Integer numberOfLesson;

    @NotNull
    private Integer status;

    @NotNull
    @Min(1)
    @Max(24)
    private Integer duration;

    @NotNull
    private BigDecimal price;

    @NotNull
    @Min(0)
    @Max((100))
    private Integer discount;

    public CourseEntity toEntity() {
        CourseEntity course = new CourseEntity();
        course.setName(this.getName());
        course.setDescription(this.getDescription());
        course.setNumberOfLesson(this.getNumberOfLesson());
        course.setStatus(this.getStatus());
        course.setPrice(this.getPrice());
        course.setDiscount(this.getDiscount());
        course.setDuration(this.getDuration());
        return course;
    }
}