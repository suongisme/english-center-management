package com.example.ecm.module.payment.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class PaymentRequest {
    @NotNull
    @Size(min = 1, max = 1)
    public List<Long> courseIds;

    @NotBlank
    private String methodPayment;
}
