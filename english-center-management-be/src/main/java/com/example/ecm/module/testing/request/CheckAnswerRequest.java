package com.example.ecm.module.testing.request;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

@Data
public class CheckAnswerRequest {
    @JsonAlias("id")
    private Long questionId;

    @JsonAlias("selectedAnswer")
    private Integer answerId;
}
