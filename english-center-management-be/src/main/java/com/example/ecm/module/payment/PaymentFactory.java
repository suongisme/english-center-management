package com.example.ecm.module.payment;

import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PaymentFactory {

    private final ApplicationContext applicationContext;

    public IPaymentService getInstance(String methodPayment) {
        try {
            return this.applicationContext.getBean("PAYMENT_" + methodPayment.toUpperCase(), IPaymentService.class);
        } catch (BeansException ex) {
            throw new BusinessException(ErrorCode.METHOD_PAYMENT_NOT_SP);
        }
    }
}
