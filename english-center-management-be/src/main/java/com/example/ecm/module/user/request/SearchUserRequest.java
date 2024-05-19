package com.example.ecm.module.user.request;

import lombok.Data;

@Data
public class SearchUserRequest {
    private Integer status;
    private String fullName;
    private String role;
}
