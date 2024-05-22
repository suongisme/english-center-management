package com.example.ecm.module.resource.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LocalResourceConfig {

    @Configuration
    @ConditionalOnProperty(value = "resource.provider", havingValue = "local")
    @ConfigurationProperties(prefix = "resource.local")
    @Setter
    @Getter
    public static class ResourceProperties {
        private String host;
        private String path;
    }

}
