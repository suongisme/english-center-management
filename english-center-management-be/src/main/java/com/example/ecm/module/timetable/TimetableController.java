package com.example.ecm.module.timetable;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.module.timetable.request.CreateTimetableRequest;
import com.example.ecm.module.timetable.request.UpdateTimetableRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/timetable")
@RequiredArgsConstructor
public class TimetableController {

    private final ITimetableService timetableService;

    @GetMapping
    public ApiResponse getById(@RequestParam Long id) {
        final ApiBody apiBody = this.timetableService.getById(id);
        return ApiResponse.ok(apiBody);
    }

    @GetMapping("/get-by-user-id")
    public ApiResponse getTimetableByUser(@RequestParam Long userId) {
        final ApiBody apiBody = this.timetableService.getByUserId(userId);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping
    public ApiResponse createTimetable(@RequestBody @Valid CreateTimetableRequest createTimetableRequest) {
        this.timetableService.createTimetable(createTimetableRequest);
        return ApiResponse.ok();
    }

    @PutMapping
    public ApiResponse updateTimetable(@RequestBody @Valid UpdateTimetableRequest updateTimetableRequest) {
        this.timetableService.updateTimetable(updateTimetableRequest);
        return ApiResponse.ok();
    }
}
