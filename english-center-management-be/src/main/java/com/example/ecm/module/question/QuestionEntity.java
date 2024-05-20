package com.example.ecm.module.question;

import com.example.ecm.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_QUESTION")
@Setter
@Getter
public class QuestionEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "TITLE")
    @Lob
    private String title;

    @Column(name = "STATUS")
    private Integer status;

    @Column(name = "LEVEL")
    private Integer level;

    @Column(name = "SCORE")
    private Integer score;
}
