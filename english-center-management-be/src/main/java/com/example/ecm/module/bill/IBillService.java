package com.example.ecm.module.bill;

import com.example.ecm.model.ApiBody;
import com.example.ecm.module.payment.request.PaymentRequest;
import com.example.ecm.module.bill.request.SearchBillRequest;

public interface IBillService {

    ApiBody getUserBill(SearchBillRequest searchBillRequest);

    ApiBody getDetailBill(Long billId);

    ApiBody payment(PaymentRequest paymentRequest);
}
