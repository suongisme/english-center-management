package com.example.ecm.module.user.request;

import lombok.Data;

import java.util.List;

@Data
public class SearchUserRequest {
    private Integer status;
    private String fullName;
    private String role;
    private List<Long> userIds;
}
