package com.example.ecm.module.question.request;

import lombok.Data;

@Data
public class SearchQuestionRequest {

    private Integer status;
    private String title;
    private Integer level;
}
