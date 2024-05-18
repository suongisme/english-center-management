package com.example.ecm.module.student.request;

import lombok.Data;

@Data
public class SearchStudentRequest {
    private Integer status;
    private String fullName;
}
