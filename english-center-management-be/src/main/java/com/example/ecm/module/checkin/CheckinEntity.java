package com.example.ecm.module.checkin;

import com.example.ecm.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_CHECKIN")
@Setter
@Getter
public class CheckinEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "TIMETABLE_DETAIL_ID")
    private Long timetableDetailId;
}
