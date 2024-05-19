package com.example.ecm.module.timetable.student;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_TIMETABLE_STUDENT")
@Setter
@Getter
public class TimetableStudentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "STUDENT_ID")
    private Long studentId;

    @Column(name = "TIMETABLE_ID")
    private Long timetableId;
}
