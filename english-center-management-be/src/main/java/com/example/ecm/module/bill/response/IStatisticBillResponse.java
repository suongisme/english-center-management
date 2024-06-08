package com.example.ecm.module.bill.response;

import java.math.BigDecimal;

public interface IStatisticBillResponse {
    Long getTotalBill();
    BigDecimal getTotalPrice();
}
