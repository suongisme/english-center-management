package com.example.ecm.module.course;

import com.example.ecm.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "TB_COURSE")
@Setter
@Getter
public class CourseEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "DESCRIPTION")
    @Lob
    private String description;

    @Column(name = "STATUS")
    private Integer status;

    @Column(name = "NUMBER_OF_LESSON")
    private Integer numberOfLesson;

    @Column(name = "DURATION")
    private Integer duration;

    @Column(name = "PRICE")
    private BigDecimal price;

    @Column(name = "DISCOUNT")
    private BigDecimal discount;

    @Column(name = "AVATAR_URL")
    private String avatarUrl;

    @Column(name = "SHORT_DESCRIPTION", length = 300)
    private String shortDescription;
}
