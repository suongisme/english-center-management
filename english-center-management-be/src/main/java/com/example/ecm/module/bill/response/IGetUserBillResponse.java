package com.example.ecm.module.bill.response;

import org.springframework.data.web.ProjectedPayload;

import java.math.BigDecimal;
import java.util.Date;

@ProjectedPayload
public interface IGetUserBillResponse {

    Long getId();

    Integer getStatus();

    String getMethodPayment();

    BigDecimal getTotalPrice();

    Date getCreatedDate();
}
