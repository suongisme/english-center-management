package com.example.ecm.module.question.answer.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateAnswerRequest {

    @NotBlank
    private String title;

    private Boolean correct;

}
