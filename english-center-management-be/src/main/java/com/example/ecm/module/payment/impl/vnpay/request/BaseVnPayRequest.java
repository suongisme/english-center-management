package com.example.ecm.module.payment.impl.vnpay.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class BaseVnPayRequest {

    @JsonProperty("vnp_Version")
    private String version;

    @JsonProperty("vnp_Command")
    private String command;

    @JsonProperty("vnp_TmnCode")
    private String tmnCode;

    @JsonProperty("vnp_TxnRef")
    private String txnRef;

    @JsonProperty("vnp_IpAddr")
    private String ipAddr;

}
