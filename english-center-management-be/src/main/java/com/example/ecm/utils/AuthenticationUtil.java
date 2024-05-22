package com.example.ecm.utils;

import lombok.experimental.UtilityClass;
import org.springframework.security.core.context.SecurityContextHolder;

@UtilityClass
public class AuthenticationUtil {

    public String getUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
