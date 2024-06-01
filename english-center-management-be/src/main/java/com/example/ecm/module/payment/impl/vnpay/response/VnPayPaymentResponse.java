package com.example.ecm.module.payment.impl.vnpay.response;

import com.example.ecm.module.payment.response.PaymentResponse;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class VnPayPaymentResponse extends PaymentResponse {
    private String paymentUrl;

    @Override
    public String getMethodPayment() {
        return "vnpay";
    }
}
