package com.example.ecm.module.payment;

import com.example.ecm.module.bill.BillEntity;
import com.example.ecm.module.payment.request.AuthenticatePaymentRequest;
import com.example.ecm.module.payment.request.PaymentRequest;
import com.example.ecm.module.payment.response.GetPaymentResponse;
import com.example.ecm.module.payment.response.PaymentResponse;

public interface IPaymentService {

    PaymentResponse payment(PaymentRequest paymentRequest);

    GetPaymentResponse query(BillEntity bill);

    void authenticate(AuthenticatePaymentRequest authenticatePaymentRequest);
}
