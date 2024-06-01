package com.example.ecm.module.payment.response;

import com.example.ecm.module.bill.BillEntity;
import lombok.Data;

@Data
public class GetPaymentResponse {

    public boolean isSuccess(BillEntity bill) {
        return false;
    }

}
