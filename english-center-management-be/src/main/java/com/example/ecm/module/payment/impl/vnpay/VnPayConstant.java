package com.example.ecm.module.payment.impl.vnpay;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class VnPayConstant {

    public static class ResponseCode {
        public static final String SUCCESS = "00";
    }

    public static class TransactionStatus {
        public static final String SUCCESS = "00";
    }
}
