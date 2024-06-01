package com.example.ecm.module.bill.schedule;

import com.example.ecm.model.SaveBatch;
import com.example.ecm.module.bill.BillEntity;
import com.example.ecm.module.bill.IBillRepository;
import com.example.ecm.module.bill.constant.BillStatus;
import com.example.ecm.module.payment.IPaymentService;
import com.example.ecm.module.payment.PaymentFactory;
import com.example.ecm.module.payment.exception.TransactionNotFoundException;
import com.example.ecm.module.payment.response.GetPaymentResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConditionalOnProperty(prefix = "schedule.bill.change-status", value = "enabled", havingValue = "true")
@RequiredArgsConstructor
@Slf4j
public class ChangeStatusBillSchedule {

    private final IBillRepository billRepository;
    private final PaymentFactory paymentFactory;
    private final JdbcTemplate jdbcTemplate;



    @Scheduled(cron = "${schedule.bill.change-status.cron}")
    public void changeStatus() {
        log.info("start schedule change-status bill");
        final List<BillEntity> waitPaymentBill = this.billRepository.getWaitPaymentBill();
        for (BillEntity bill : waitPaymentBill) {
            log.info("query {} order-id{}", bill.getMethodPayment(), bill.getId());
            final IPaymentService paymentService = this.paymentFactory.getInstance(bill.getMethodPayment());
            try {
                final GetPaymentResponse query = paymentService.query(bill);
                if (query.isSuccess(bill)) {
                    bill.setStatus(BillStatus.PAID.getValue());
                }
            } catch (TransactionNotFoundException exception) {
                this.billRepository.deleteById(bill.getId());
            }
        }
        SaveBatch<BillEntity> saveBatch = new SaveBatch<>(waitPaymentBill, (ps, data) -> {
            ps.setInt(1, data.getStatus());
            ps.setLong(2, data.getId());
        });
        this.jdbcTemplate.batchUpdate("UPDATE TB_BILL SET status = ? WHERE ID = ?", saveBatch);
        log.info("end schedule change-status bill");
    }

}
