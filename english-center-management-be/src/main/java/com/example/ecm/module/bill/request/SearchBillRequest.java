package com.example.ecm.module.bill.request;

import lombok.Data;

import java.util.Date;

@Data
public class SearchBillRequest {
    private Date fromDate;
    private Date toDate;
    private String username;
}
