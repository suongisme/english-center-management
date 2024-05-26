package com.example.ecm.module.auth.impl;

import com.example.ecm.constant.AppConstant;
import com.example.ecm.model.ApiBody;
import com.example.ecm.module.auth.IAuthService;
import com.example.ecm.module.auth.model.CustomUser;
import com.example.ecm.module.auth.request.LoginRequest;
import com.example.ecm.module.auth.request.RegisterRequest;
import com.example.ecm.module.auth.response.LoginResponse;
import com.example.ecm.module.user.IUserRepository;
import com.example.ecm.module.auth.utils.JwtUtils;
import com.example.ecm.module.user.IUserService;
import com.example.ecm.module.user.UserEntity;
import com.example.ecm.module.user.constant.RoleEnum;
import com.example.ecm.module.user.request.CreateUserRequest;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {

    private final IUserRepository userRepository;
    private final JwtUtils jwtUtils;

    private final IUserService userService;

    @Setter
    private AuthenticationManager authenticationManager;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByUsername(username)
                .map(CustomUser::new)
                .orElseThrow(() -> new UsernameNotFoundException("not found: " + username));
    }

    @Override
    public ApiBody login(LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());
        final Authentication authenticate = this.authenticationManager.authenticate(authentication);
        CustomUser customUser = (CustomUser) authenticate.getPrincipal();
        final String jwt = this.jwtUtils.gen(loginRequest.getUsername(), authenticate);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setUsername(loginRequest.getUsername());
        loginResponse.setJwt(jwt);
        loginResponse.setId(customUser.getId());
        loginResponse.setFirstName(customUser.getFirstName());
        loginResponse.setLastName(customUser.getLastName());
        loginResponse.setAddress(customUser.getAddress());
        loginResponse.setDob(customUser.getDob());
        loginResponse.setPhone(customUser.getPhone());
        loginResponse.setEmail(customUser.getEmail());
        return ApiBody.of(loginResponse);
    }

    @Override
    public void register(RegisterRequest registerRequest) {
        CreateUserRequest createUserRequest = new CreateUserRequest();
        createUserRequest.setFirstName(registerRequest.getFirstName());
        createUserRequest.setRole(RoleEnum.STUDENT);
        createUserRequest.setLastName(registerRequest.getLastName());
        createUserRequest.setUsername(registerRequest.getUsername());
        createUserRequest.setPassword(registerRequest.getPassword());
        createUserRequest.setStatus(AppConstant.ACTIVE);
        this.userService.createUser(createUserRequest);
    }
}
