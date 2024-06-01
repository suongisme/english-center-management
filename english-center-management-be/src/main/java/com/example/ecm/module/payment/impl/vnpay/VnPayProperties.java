package com.example.ecm.module.payment.impl.vnpay;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
@ConfigurationProperties(prefix = "payment.vnpay")
@Data
public class VnPayProperties {
    private String payUrl;
    private String returnUrl;
    private String tmnCode;
    private String secretCode;
    private String apiUrl;
    private String version;
    private Duration timeout;
    private String ccy;
    private Duration expOrder;
    private String orderInfoTemplate;
}
