package com.example.ecm.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Getter
@Setter
@ToString
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    @CreatedDate
    @Column(name = "CREATED_DATE")
    private Date createdDate;

    @CreatedBy
    @Column(name = "CREATED_BY")
    private String createdBy;

    @LastModifiedDate
    @Column(name = "UPDATED_DATE")
    private Date updatedDate;

    @LastModifiedBy
    @Column(name = "UPDATED_BY")
    private String updatedBy;
}


