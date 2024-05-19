package com.example.ecm.module.course.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class SearchCourserRequest {
    private String name;
    private BigDecimal fromPrice;
    private BigDecimal toPrice;
    private Integer status;
}
