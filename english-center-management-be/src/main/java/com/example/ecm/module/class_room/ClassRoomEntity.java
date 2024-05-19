package com.example.ecm.module.class_room;

import com.example.ecm.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_CLASS_ROOM")
@Setter
@Getter
public class ClassRoomEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "POSITION")
    private Integer position;

    @Column(name = "SIZE")
    private Integer size;

    @Column(name = "STATUS")
    private Integer status;

}
