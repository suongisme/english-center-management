package com.example.ecm.module.auth.model;

import com.example.ecm.constant.AppConstant;
import com.example.ecm.module.user.UserEntity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Setter
@Getter
public class CustomUser extends User {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String phone;
    private Date dob;

    public CustomUser(UserEntity userEntity) {
        this(userEntity.getUsername(), userEntity.getPassword(), AppConstant.ACTIVE == userEntity.getStatus(), List.of(new SimpleGrantedAuthority(userEntity.getRole())));
        this.id = userEntity.getId();
        this.phone = userEntity.getPhone();
        this.email = userEntity.getEmail();
        this.address = userEntity.getAddress();
        this.dob = userEntity.getDob();
        this.firstName = userEntity.getFirstName();
        this.lastName = userEntity.getLastName();
    }

    public CustomUser(String username, String password, boolean isEnabled, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, isEnabled, true, true, true, authorities);
    }
}
