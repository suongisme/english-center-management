package com.example.ecm.module.timetable.gradebook.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class CreateTimetableGradeBookRequest {
    @NotNull
    private Long timetableId;

    @NotNull
    @Size(min = 1)
    private List<Detail> details;

    @Data
    public static class Detail {
        @NotNull
        private Long studentId;
        private String note;

        @NotNull
        private Double score;
    }
}
