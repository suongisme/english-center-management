package com.example.ecm.module.class_room.request;

import lombok.Data;

@Data
public class SearchClassRoomRequest {
    private Integer position;
    private String name;
    private Integer status;
}
