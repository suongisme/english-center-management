package com.example.ecm.module.question.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class UpdateQuestionRequest extends CreateQuestionRequest {

    @NotNull
    private Long id;
}
