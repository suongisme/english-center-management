package com.example.ecm.module.payment.impl.vnpay.response;

import com.example.ecm.module.bill.BillEntity;
import com.example.ecm.module.payment.response.GetPaymentResponse;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
public class QueryVnPayResponse extends GetPaymentResponse {

    @JsonAlias("vnp_ResponseId")
    private String responseId;

    @JsonAlias("vnp_Command")
    private String command;

    @JsonAlias("vnp_TmnCode")
    private String tmnCode;

    @JsonAlias("vnp_TxnRef")
    private String txnRef;

    @JsonAlias("vnp_Amount")
    private BigDecimal amount;

    @JsonAlias("vnp_OrderInfo")
    private String orderInfo;

    @JsonAlias("vnp_ResponseCode")
    private String responseCode;

    @JsonAlias("vnp_Message")
    private String message;

    @JsonAlias("vnp_BankCode")
    private String bankCode;

    @JsonAlias("vnp_PayDate")
    @JsonFormat(pattern = "yyyyMMddHHmmss", timezone = "GMT+7")
    private Date payDate;

    @JsonAlias("vnp_TransactionNo")
    private BigDecimal transactionNo;

    @JsonAlias("vnp_TransactionType")
    private Integer transactionType;

    @JsonAlias("vnp_TransactionStatus")
    private String transactionStatus;

    @JsonAlias("vnp_PromotionCode")
    private Integer  promotionCode;

    @JsonAlias("vnp_PromotionAmount")
    private Integer promotionAmount;

    @JsonAlias("vnp_SecureHash")
    private String secureHash;

    @Override
    public boolean isSuccess(BillEntity bill) {
        return "00".equals(this.responseCode) && "00".equals(this.transactionStatus);
    }
}
