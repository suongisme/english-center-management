package com.example.ecm.module.bill.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BillStatus {

    WAIT(1, "doi xac thuc"),
    PAID(2, "da thanh toan"),
    REFUND(3, "da hoan tien");

    private final int value;
    private final String desc;
}
