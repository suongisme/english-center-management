package com.example.ecm.module.user.request;

import com.example.ecm.module.user.UserEntity;
import com.example.ecm.module.user.constant.RoleEnum;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CreateUserRequest {

    @NotBlank
    @Size(max = 255)
    private String firstName;

    @NotBlank
    @Size(max = 255)
    private String lastName;

    @NotNull
    private Date dob;

    @NotBlank
    @Email
    @Size(max = 255)
    private String email;

    @NotBlank
    @Size(max = 20)
    private String phone;

    @NotBlank
    @Size(max = 2000)
    private String address;

    @NotNull
    private Integer status;

    @NotNull
    private RoleEnum role;

    @NotBlank
    private String username;

    private String password;

    public UserEntity toEntity() {
        UserEntity user = new UserEntity();
        user.setStatus(this.getStatus());
        user.setFirstName(this.getFirstName());
        user.setLastName(this.getLastName());
        user.setDob(this.getDob());
        user.setAddress(this.getAddress());
        user.setEmail(this.getEmail());
        user.setPhone(this.getPhone());
        user.setRole(this.getRole().name());
        user.setUsername(this.getUsername());
        user.setPassword(this.getPassword());
        return user;
    }

}
