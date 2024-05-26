package com.example.ecm.module.auth;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.module.auth.request.LoginRequest;
import com.example.ecm.module.auth.request.RegisterRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IAuthService authService;

    @PostMapping
    private ApiResponse login(@RequestBody @Valid LoginRequest loginRequest) {
        final ApiBody login = this.authService.login(loginRequest);
        return ApiResponse.ok(login);
    }

    @PostMapping("/register")
    public ApiResponse register(@RequestBody @Valid RegisterRequest registerRequest) {
        this.authService.register(registerRequest);
        return ApiResponse.ok();
    }
}
