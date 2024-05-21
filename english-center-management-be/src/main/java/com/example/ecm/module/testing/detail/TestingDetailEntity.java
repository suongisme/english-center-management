package com.example.ecm.module.testing.detail;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_TESTING_DETAIL")
@Setter
@Getter
public class TestingDetailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "QUESTION_ID")
    private Long questionId;

    @Column(name = "TESTING_ID")
    private Long testingId;
}
