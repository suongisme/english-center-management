package com.example.ecm.module.payment;

import com.example.ecm.model.ApiResponse;
import com.example.ecm.module.payment.request.AuthenticatePaymentRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentFactory paymentFactory;

    @PostMapping("/authenticate")
    @PreAuthorize("hasAuthority('SCOPE_STUDENT')")
    public ApiResponse authenticate(@RequestBody @Valid AuthenticatePaymentRequest request) {
        final IPaymentService paymentService = this.paymentFactory.getInstance(request.getPaymentMethod());
        paymentService.authenticate(request);
        return ApiResponse.ok();
    }
}
