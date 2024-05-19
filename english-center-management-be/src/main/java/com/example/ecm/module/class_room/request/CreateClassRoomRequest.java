package com.example.ecm.module.class_room.request;

import com.example.ecm.module.class_room.ClassRoomEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateClassRoomRequest {

    @NotBlank
    @Size(max = 255)
    private String name;

    @NotNull
    private Integer position;

    @NotNull
    private Integer size;

    @NotNull
    private Integer status;

    public ClassRoomEntity toEntity() {
        ClassRoomEntity classRoomEntity = new ClassRoomEntity();
        classRoomEntity.setName(this.getName());
        classRoomEntity.setPosition(this.getPosition());
        classRoomEntity.setSize(this.getSize());
        classRoomEntity.setStatus(this.getStatus());
        return classRoomEntity;
    }

}
