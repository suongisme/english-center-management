package com.example.ecm.module.auth;

import com.example.ecm.module.auth.impl.AuthServiceImpl;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

import javax.xml.bind.DatatypeConverter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.List;
import java.util.Map;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class AuthConfig {

    @Autowired
    private SecurityProperties securityProperties;

    @Configuration
    @ConfigurationProperties(prefix = "security")
    @Data
    public static class SecurityProperties {
        private Map<String, String[]> permitAll;
        private Resource privateKeyLocation;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request -> {
                    this.securityProperties.permitAll.forEach((key, value) -> {
                        if (key.equalsIgnoreCase("ALL")) {
                            request.requestMatchers(value).permitAll();
                            return;
                        }
                        request.requestMatchers(HttpMethod.valueOf(key.toUpperCase()), value).permitAll();
                    });
                    request.requestMatchers("/auth/**").permitAll()
                            .requestMatchers("/assets/**").permitAll()
                            .anyRequest()
                            .authenticated();
                })
                .oauth2ResourceServer(resource -> {
                    resource.jwt(Customizer.withDefaults());
                })
                .sessionManagement(session -> {
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                })
                .build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        return new JwtAuthenticationConverter();
    }

    @Bean
    public AuthenticationManager authenticationManager(PasswordEncoder passwordEncoder, AuthServiceImpl authService) {
        final DaoAuthenticationProvider daoAuthenticationProvider = this.daoAuthenticationProvider(passwordEncoder, authService);
        final ProviderManager providerManager = new ProviderManager(daoAuthenticationProvider);
        authService.setAuthenticationManager(providerManager);
        return providerManager;
    }

    public DaoAuthenticationProvider daoAuthenticationProvider(PasswordEncoder passwordEncoder, AuthServiceImpl userDetailsService) {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        return daoAuthenticationProvider;
    }

    @Bean
    public PrivateKey privateKey() throws IOException, NoSuchAlgorithmException, InvalidKeySpecException {
        final String key = this.securityProperties.privateKeyLocation.getContentAsString(StandardCharsets.UTF_8)
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "");
        PKCS8EncodedKeySpec keySpec =
                new PKCS8EncodedKeySpec(DatatypeConverter.parseBase64Binary(key));
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePrivate(keySpec);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
