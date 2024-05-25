package com.example.ecm.module.testing;

import com.example.ecm.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_TESTING")
@Setter
@Getter
public class TestingEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "STATUS")
    private Integer status;

    @Column(name = "COURSE_ID")
    private Long courseId;

    @Column(name = "MINIMUM_SCORE")
    private Integer minimumScore;
}
