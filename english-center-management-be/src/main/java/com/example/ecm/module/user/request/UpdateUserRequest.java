package com.example.ecm.module.user.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserRequest extends CreateUserRequest {

    @NotNull
    private Long id;
}
