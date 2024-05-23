package com.example.ecm.module.class_room;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.class_room.request.CreateClassRoomRequest;
import com.example.ecm.module.class_room.request.SearchClassRoomRequest;
import com.example.ecm.module.class_room.request.UpdateClassRoomRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/class-room")
@RequiredArgsConstructor
public class ClassRoomController {

    private final IClassRoomService classRoomService;

    @PostMapping("/search")
    public ApiResponse searchClassRoom(@RequestBody @Valid SearchRequest<SearchClassRoomRequest> searchRequest) {
        final ApiBody apiBody = this.classRoomService.searchClassRoom(searchRequest);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse createClassRoom(@RequestBody @Valid CreateClassRoomRequest createClassRoomRequest) {
        this.classRoomService.createClassRoom(createClassRoomRequest);
        return ApiResponse.ok();
    }

    @PutMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse updateClassRoom(@RequestBody @Valid UpdateClassRoomRequest updateClassRoomRequest) {
        this.classRoomService.updateClassRoom(updateClassRoomRequest);
        return ApiResponse.ok();
    }
}
