package com.example.ecm.module.resource;

import com.example.ecm.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_RESOURCE")
@Setter
@Getter
public class ResourceEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "PROVIDER")
    private String provider;

    @Column(name = "KEY_ID")
    private Long keyId;

    @Column(name = "TYPE")
    private String type;

    @Column(name = "URL")
    private String url;

    @Column(name = "FILE_NAME")
    private String fileName;
}
