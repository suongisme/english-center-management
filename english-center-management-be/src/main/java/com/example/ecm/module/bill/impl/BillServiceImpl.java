package com.example.ecm.module.bill.impl;

import com.example.ecm.model.ApiBody;
import com.example.ecm.module.bill.IBillRepository;
import com.example.ecm.module.bill.IBillService;
import com.example.ecm.module.bill.request.StatisticBillRequest;
import com.example.ecm.module.bill.request.StatisticRevenueRequest;
import com.example.ecm.module.bill.response.IStatisticBillResponse;
import com.example.ecm.module.bill.response.RevenueResponse;
import com.example.ecm.module.payment.IPaymentService;
import com.example.ecm.module.payment.PaymentFactory;
import com.example.ecm.module.bill.detail.IBIllDetailRepository;
import com.example.ecm.module.payment.request.PaymentRequest;
import com.example.ecm.module.bill.request.SearchBillRequest;
import com.example.ecm.module.bill.response.IGetDetailBillResponse;
import com.example.ecm.module.bill.response.IGetUserBillResponse;
import com.example.ecm.module.payment.response.PaymentResponse;
import com.example.ecm.utils.AuthenticationUtil;
import jakarta.persistence.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BillServiceImpl implements IBillService {

    private final IBillRepository billRepository;
    private final IBIllDetailRepository ibIllDetailRepository;
    private final PaymentFactory paymentFactory;

    @Override
    public ApiBody getUserBill(SearchBillRequest searchBillRequest) {
        final String username = AuthenticationUtil.getUsername();
        searchBillRequest.setUsername(username);
        final List<IGetUserBillResponse> response = this.billRepository.searchBy(searchBillRequest);
        return ApiBody.of(response);
    }

    @Override
    public ApiBody getDetailBill(Long billId) {
        final List<IGetDetailBillResponse> response = this.ibIllDetailRepository.getByBillId(billId);
        return ApiBody.of(response);
    }

    @Override
    @Transactional
    public ApiBody payment(PaymentRequest paymentRequest) {
        final IPaymentService instance = this.paymentFactory.getInstance(paymentRequest.getMethodPayment());
        final PaymentResponse response = instance.payment(paymentRequest);
        return ApiBody.of(response);
    }


    @Override
    public ApiBody statisticRevenue(StatisticRevenueRequest statisticRevenueRequest) {
        List<Tuple> statisticBill = "YEAR".equals(statisticRevenueRequest.getType())
                ? this.billRepository.statisticBillByYear(statisticRevenueRequest.getYear())
                : this.billRepository.statisticBillByQuarter(statisticRevenueRequest.getYear(), statisticRevenueRequest.getQuarter());
        final Map<Integer, RevenueResponse> month = statisticBill.stream()
                .collect(Collectors.toMap(tuple -> tuple.get("month", Integer.class), tuple -> {
                    RevenueResponse response = new RevenueResponse();
                    response.setLabel(tuple.get("month").toString());
                    response.setValue(tuple.get("totalPrice", BigDecimal.class));
                    return response;
                }));
        int months = "YEAR".equals(statisticRevenueRequest.getType()) ? 12 : 3;
        if ("YEAR".equals(statisticRevenueRequest.getType()) || Objects.isNull(statisticRevenueRequest.getQuarter())) {
            statisticRevenueRequest.setQuarter(1);
        }
        List<RevenueResponse> revenueResponses = new ArrayList<>();
        for (int i = 1; i <= months; i++) {
            Integer index = i + ((statisticRevenueRequest.getQuarter() - 1) * 3);
            final RevenueResponse orDefault = month.getOrDefault(index, new RevenueResponse(String.valueOf(index), BigDecimal.ZERO));
            revenueResponses.add(orDefault);
        }
        return ApiBody.of(revenueResponses);
    }

    @Override
    public ApiBody statisticBill(StatisticBillRequest statisticBillRequest) {
        final IStatisticBillResponse response = this.billRepository.statisticBill(statisticBillRequest.getDate());
        return ApiBody.of(response);
    }
}
