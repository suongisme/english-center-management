package com.example.ecm.module.bill;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.module.bill.request.StatisticBillRequest;
import com.example.ecm.module.bill.request.StatisticRevenueRequest;
import com.example.ecm.module.payment.request.PaymentRequest;
import com.example.ecm.module.bill.request.SearchBillRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bills")
@RequiredArgsConstructor
public class BillController {

    private final IBillService billService;

    @PreAuthorize("hasAnyAuthority('SCOPE_STUDENT')")
    @PostMapping("/get-bill")
    public ApiResponse getUserBill(@RequestBody SearchBillRequest searchBillRequest) {
        ApiBody apiBody = this.billService.getUserBill(searchBillRequest);
        return ApiResponse.ok(apiBody);
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_STUDENT')")
    @GetMapping("/get-detail")
    public ApiResponse getDetailBill(@RequestParam Long billId) {
        ApiBody apiBody = this.billService.getDetailBill(billId);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping("/payment")
    @PreAuthorize("hasAnyAuthority('SCOPE_STUDENT')")
    public ApiResponse payment(@RequestBody @Valid PaymentRequest paymentRequest) {
        ApiBody apiBody = this.billService.payment(paymentRequest);
        return ApiResponse.ok(apiBody);
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    @PostMapping("/statistic-revenue")
    public ApiResponse statisticRevenue(@RequestBody StatisticRevenueRequest searchBillRequest) {
        ApiBody apiBody = this.billService.statisticRevenue(searchBillRequest);
        return ApiResponse.ok(apiBody);
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    @PostMapping("/statistic-bill")
    public ApiResponse statisticBill(@RequestBody StatisticBillRequest searchBillRequest) {
        ApiBody apiBody = this.billService.statisticBill(searchBillRequest);
        return ApiResponse.ok(apiBody);
    }
}
