package com.example.ecm.module.auth;

import com.example.ecm.constant.AppConstant;
import com.example.ecm.module.user.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {

    private final IUserRepository userRepository;

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
}
