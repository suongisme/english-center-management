package com.example.ecm.module.payment.impl.vnpay.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.commons.lang3.time.DateFormatUtils;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
public class QueryVnPayRequest extends BaseVnPayRequest {

    @JsonProperty("vnp_RequestId")
    private String requestId;

    @JsonProperty("vnp_TxnRef")
    private String txnRef;

    @JsonProperty("vnp_SecureHash")
    private String secureHash;

    @JsonProperty("vnp_OrderInfo")
    private String orderInfo;

    @JsonProperty("vnp_TransactionDate")
    @JsonFormat(pattern = "yyyyMMddHHmmss", timezone = "GMT+7")
    private Date transactionDate;

    @JsonProperty("vnp_CreateDate")
    @JsonFormat(pattern = "yyyyMMddHHmmss", timezone = "GMT+7")
    private Date createdDate;

    public String hashData() {
        return String.join("|", this.requestId, this.getVersion(), this.getCommand(), this.getTmnCode(), this.txnRef, DateFormatUtils.format(this.transactionDate, "yyyyMMddHHmmss"), DateFormatUtils.format(this.createdDate, "yyyyMMddHHmmss"), this.getIpAddr(), this.orderInfo);
    }

}
