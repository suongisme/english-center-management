package com.example.ecm.module.timetable;

import com.example.ecm.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Entity
@Table(name = "TB_TIMETABLE")
@Setter
@Getter
public class TimetableEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "COURSE_ID")
    private Long courseId;

    @Column(name = "CLASS_ROOM_ID")
    private Long classRoomId;

    @Column(name = "TEACHER_ID")
    private Long teacherId;

    @Column(name = "DAY")
    private Integer day;

    @Column(name = "START_TIME")
    private LocalTime startTime;

    @Column(name = "STATUS")
    private Integer status;
}
