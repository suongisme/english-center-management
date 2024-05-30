package com.example.ecm.module.timetable.gradebook;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_TIMETABLE_GRADEBOOK_DETAIL")
@Setter
@Getter
public class TimetableGradeBookDetailEntity {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "STUDENT_ID")
    private Long studentId;

    @Column(name = "SCORE")
    private Double score;

    @Column(name = "NOTE")
    private String note;

    @Column(name = "TIMETABLE_GRADEBOOK_ID")
    private Long gradebookId;
}
