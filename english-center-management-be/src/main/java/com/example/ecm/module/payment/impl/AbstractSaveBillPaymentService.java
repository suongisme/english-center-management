package com.example.ecm.module.payment.impl;

import static com.example.ecm.constant.AppConstant.*;
import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.module.bill.BillEntity;
import com.example.ecm.module.bill.IBillRepository;
import com.example.ecm.module.bill.constant.BillStatus;
import com.example.ecm.module.bill.detail.BillDetailEntity;
import com.example.ecm.module.bill.detail.IBIllDetailRepository;
import com.example.ecm.module.course.CourseEntity;
import com.example.ecm.module.course.ICourseRepository;
import com.example.ecm.module.payment.IPaymentService;
import com.example.ecm.module.payment.request.PaymentRequest;
import com.example.ecm.module.payment.response.PaymentResponse;
import com.example.ecm.utils.JSON;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

public abstract class AbstractSaveBillPaymentService implements IPaymentService {

    protected final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Setter(onMethod_ = { @Autowired })
    protected IBillRepository billRepository;

    @Setter(onMethod_ = {@Autowired})
    protected IBIllDetailRepository ibIllDetailRepository;

    @Setter(onMethod_ = { @Autowired })
    protected ICourseRepository courseRepository;

    @Override
    @Transactional
    public PaymentResponse payment(PaymentRequest paymentRequest) {
        LOGGER.info("payment: {}", JSON.stringify(paymentRequest));
        final List<CourseEntity> courses = this.courseRepository.findAllById(paymentRequest.getCourseIds());
        final boolean isIncludeInactiveCourse = courses.stream()
                .anyMatch(x -> x.getStatus() == INACTIVE);
        if (isIncludeInactiveCourse) {
            throw new BusinessException(ErrorCode.VALIDATE_FAIL);
        }
        final BigDecimal totalPrice = courses.stream()
                .map(x -> ONE_HUNDRED.subtract(x.getDiscount()).divide(ONE_HUNDRED).multiply(x.getPrice()))
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .setScale(0, RoundingMode.CEILING);

        BillEntity bill = new BillEntity();
        bill.setTotalPrice(totalPrice);
        bill.setMethodPayment(paymentRequest.getMethodPayment());
        bill.setStatus(BillStatus.WAIT.getValue());
        this.billRepository.save(bill);
        LOGGER.info("save bill: {}", JSON.stringify(bill));
        List<BillDetailEntity> details = new ArrayList<>();
        for (CourseEntity course : courses) {
            BillDetailEntity billDetailEntity = new BillDetailEntity();
            billDetailEntity.setBillId(bill.getId());
            billDetailEntity.setDiscount(course.getDiscount());
            billDetailEntity.setPrice(course.getPrice());
            billDetailEntity.setCourseId(course.getId());
            details.add(billDetailEntity);
        }
        this.ibIllDetailRepository.saveAll(details);
        LOGGER.info("save bill detail: {}", JSON.stringify(details));
        return this.payment(bill, details);
    }

    protected abstract PaymentResponse payment(BillEntity bill, List<BillDetailEntity> details);
}
