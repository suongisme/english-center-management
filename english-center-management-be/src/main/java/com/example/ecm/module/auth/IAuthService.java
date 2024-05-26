package com.example.ecm.module.auth;

import com.example.ecm.model.ApiBody;
import com.example.ecm.module.auth.request.LoginRequest;
import com.example.ecm.module.auth.request.RegisterRequest;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IAuthService extends UserDetailsService {
    ApiBody login(LoginRequest loginRequest);

    void register(RegisterRequest registerRequest);
}
