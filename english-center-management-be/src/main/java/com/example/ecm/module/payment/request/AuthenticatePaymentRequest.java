package com.example.ecm.module.payment.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Map;

@Data
public class AuthenticatePaymentRequest {
    @NotBlank
    private String paymentMethod;

    @NotNull
    private Map<String, Object> data;
}
