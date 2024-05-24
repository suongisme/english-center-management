package com.example.ecm.module.auth.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Setter
@Getter
public class CustomUser extends User {

    private Long id;

    public CustomUser(String username, String password, boolean isEnabled, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, isEnabled, true, true, true, authorities);
    }
}
