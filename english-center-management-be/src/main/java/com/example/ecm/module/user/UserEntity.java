package com.example.ecm.module.user;

import com.example.ecm.entity.BaseEntity;
import com.example.ecm.module.user.constant.RoleEnum;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "TB_USER")
@Setter
@Getter
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
public class UserEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    @EqualsAndHashCode.Include
    private Long id;

    @Column(name = "FIRST_NAME")
    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastName;

    @Column(name = "STATUS")
    private Integer status;

    @Column(name = "PHONE_NUMBER", length = 20)
    private String phone;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "ADDRESS", length = 2000)
    private String address;

    @Column(name = "DOB")
    private Date dob;

    @Column(name = "ROLE")
    private String role;

    @Column(name = "USERNAME", unique = true)
    private String username;

    @Column(name = "PASSWORD")
    private String password;
}
