package com.example.ecm.module.bill.response;

import org.springframework.data.web.ProjectedPayload;

import java.math.BigDecimal;

@ProjectedPayload
public interface IGetDetailBillResponse {

    Long getId();

    String getCourseName();

    String getTeacherName();

    String getClassRoomName();

    BigDecimal getPrice();

    BigDecimal getDiscount();

    Double getScore();

    String getNote();

    Long getTimetableId();
}
