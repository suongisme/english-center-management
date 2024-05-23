package com.example.ecm.module.auth.impl;

import com.example.ecm.constant.AppConstant;
import com.example.ecm.model.ApiBody;
import com.example.ecm.module.auth.IAuthService;
import com.example.ecm.module.auth.request.LoginRequest;
import com.example.ecm.module.auth.response.LoginResponse;
import com.example.ecm.module.user.IUserRepository;
import com.example.ecm.module.auth.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {

    private final IUserRepository userRepository;
    private final JwtUtils jwtUtils;

    @Setter
    private AuthenticationManager authenticationManager;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByUsername(username)
                .map(u ->
                        User.withUsername(u.getUsername())
                                .password(u.getPassword())
                                .authorities(u.getRole())
                                .disabled(u.getStatus() != AppConstant.ACTIVE)
                                .build()
                )
                .orElseThrow(() -> new UsernameNotFoundException("not found: " + username));
    }

    @Override
    public ApiBody login(LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());
        final Authentication authenticate = this.authenticationManager.authenticate(authentication);
        final String jwt = this.jwtUtils.gen(loginRequest.getUsername(), authenticate);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setUsername(loginRequest.getUsername());
        loginResponse.setJwt(jwt);
        return ApiBody.of(loginResponse);
    }
}
