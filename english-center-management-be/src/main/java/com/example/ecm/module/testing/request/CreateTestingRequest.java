package com.example.ecm.module.testing.request;

import com.example.ecm.module.testing.TestingEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class CreateTestingRequest {

    @NotBlank
    private String name;

    @NotNull
    private Long courseId;

    @NotNull
    private Integer status;

    @NotNull
    @Size(min = 1)
    private List<Long> questionIds;

    @NotNull
    private Integer minimumScore;

    public TestingEntity toEntity() {
        TestingEntity testing = new TestingEntity();
        testing.setCourseId(this.getCourseId());
        testing.setStatus(this.getStatus());
        testing.setName(this.getName());
        testing.setMinimumScore(this.getMinimumScore());
        return testing;
    }
}
