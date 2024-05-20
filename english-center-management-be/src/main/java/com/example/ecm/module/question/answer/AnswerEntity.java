package com.example.ecm.module.question.answer;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_ANSWER")
@Setter
@Getter
public class AnswerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "TITLE")
    @Lob
    private String title;

    @Column(name = "QUESTION_ID")
    private Long questionId;

    @Column(name = "CORRECT")
    private Boolean correct;
}
