package com.example.ecm.module.bill.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class StatisticRevenueRequest {
    @Pattern(regexp = "YEAR|QUARTER")
    private String type;

    @NotNull
    private Long year;
    private Integer quarter;
}
