package com.example.ecm.module.user.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.util.Date;

@Data
public class UpdateUserInfoRequest {

    private String firstName;

    private String lastName;

    @Email
    private String email;

    @Pattern(regexp = "(0|\\+84)[0-9]{9}")
    private String phone;

    private String address;

    private Date dob;
}
