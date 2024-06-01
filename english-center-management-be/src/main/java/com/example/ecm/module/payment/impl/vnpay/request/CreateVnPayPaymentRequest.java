package com.example.ecm.module.payment.impl.vnpay.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
public class CreateVnPayPaymentRequest extends BaseVnPayRequest {

    @JsonProperty("vnp_Amount")
    private BigDecimal amount;

    @JsonProperty("vnp_CurrCode")
    private String ccy;

    @JsonProperty("vnp_BankCode")
    private String bankCode;

    @JsonProperty("vnp_OrderInfo")
    private String orderInfo;

    @JsonProperty("vnp_OrderType")
    private String orderType;

    @JsonProperty("vnp_Locale")
    private String language = "vn";

    @JsonProperty("vnp_ReturnUrl")
    private String returnUrl;

    @JsonProperty("vnp_CreateDate")
    @JsonFormat(pattern = "yyyyMMddHHmmss", timezone = "GMT+7")
    private Date createdDate;

    @JsonProperty("vnp_ExpireDate")
    @JsonFormat(pattern = "yyyyMMddHHmmss", timezone = "GMT+7")
    private Date expireDate;
}
