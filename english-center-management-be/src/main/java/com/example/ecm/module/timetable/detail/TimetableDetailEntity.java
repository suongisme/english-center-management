package com.example.ecm.module.timetable.detail;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Table(name = "TB_TIMETABLE_DETAIL")
@Entity
@Setter
@Getter
public class TimetableDetailEntity {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "START_TIME")
    private LocalTime startTime;

    @Column(name = "DAY")
    private Integer day;

    @Column(name = "TIMETABLE_ID")
    private Long timetableId;
}
