package com.example.ecm.module.auth.response;

import lombok.Data;

import java.util.Date;

@Data
public class LoginResponse {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String jwt;
    private Date dob;
}
