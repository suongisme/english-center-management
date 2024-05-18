package com.example.ecm.module.student;

import com.example.ecm.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "TB_STUDENT")
@Setter
@Getter
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
public class StudentEntity extends BaseEntity {

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

    @Column(name = "PHONE", length = 20)
    private String phone;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "ADDRESS", length = 2000)
    private String address;

    @Column(name = "DOB")
    private Date dob;
}
