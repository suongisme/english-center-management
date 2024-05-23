package com.example.ecm.module.timetable.gradebook;

import com.example.ecm.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_TIMETABLE_GRADEBOOK")
@Setter
@Getter
public class TimetableGradeBookEntity extends BaseEntity {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "CLASS_ROOM_ID")
    private Long classRoomId;

    @Column(name = "TEACHER_ID")
    private Long teacherId;

    @Column(name = "COURSE_ID")
    private Long courseId;
}
