package com.example.ecm.config;

import com.example.ecm.utils.AuthenticationUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@Configuration
@EnableJpaAuditing
public class AuditConfig {

    @Bean("auditAwareImpl")
    public AuditorAware<String> auditorAware() {
        return () -> Optional.of(AuthenticationUtil.getUsername());
    }
}
