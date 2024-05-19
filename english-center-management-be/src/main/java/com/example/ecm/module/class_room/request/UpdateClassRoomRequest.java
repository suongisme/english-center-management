package com.example.ecm.module.class_room.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class UpdateClassRoomRequest extends CreateClassRoomRequest {

    @NotNull
    private Long id;
}
