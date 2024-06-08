package com.example.ecm.module.checkin.student;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_CHECKIN_STUDENT")
@Setter
@Getter
public class CheckinStudentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "CHECKIN_ID")
    private Long checkinId;

    @Column(name = "STUDENT_ID")
    private Long studentId;

    @Column(name = "PRESENT")
    private Boolean present;

    @Column(name = "NOTE")
    private String note;
}
