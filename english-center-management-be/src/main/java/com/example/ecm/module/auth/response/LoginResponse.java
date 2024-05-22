package com.example.ecm.module.auth.response;

import lombok.Data;

@Data
public class LoginResponse {
    private String username;
    private String jwt;
}
