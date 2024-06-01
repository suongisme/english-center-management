package com.example.ecm.module.payment.impl.vnpay;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

@Configuration
@ConditionalOnBean(VnPayProperties.class)
@RequiredArgsConstructor
public class VnPayConfig {

    private final VnPayProperties vnPayProperties;

    @Bean("vnPayRestTemplate")
    public RestTemplate restTemplate() {
        return new RestTemplateBuilder()
                .rootUri(this.vnPayProperties.getApiUrl())
                .setConnectTimeout(this.vnPayProperties.getTimeout())
                .setReadTimeout(this.vnPayProperties.getTimeout())
                .defaultHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

}
