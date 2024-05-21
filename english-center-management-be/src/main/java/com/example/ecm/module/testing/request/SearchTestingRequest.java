package com.example.ecm.module.testing.request;

import lombok.Data;

@Data
public class SearchTestingRequest {
    private String name;
    private Integer status;
    private Integer courseId;
}
