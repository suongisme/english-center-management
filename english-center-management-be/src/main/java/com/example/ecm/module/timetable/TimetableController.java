package com.example.ecm.module.timetable;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.module.timetable.request.CreateTimetableRequest;
import com.example.ecm.module.timetable.request.UpdateTimetableRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

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
    public ApiResponse getTimetableByUser(@RequestParam Long userId, @RequestParam(required = false) Integer day, @RequestParam(defaultValue = "1") Integer status) {
        final ApiBody apiBody = this.timetableService.getByUserIdAndDay(userId, day, status);
        return ApiResponse.ok(apiBody);
    }

    @GetMapping("/get-for-grade-book")
    public ApiResponse getTimetableForGradebook(@RequestParam Long userId) {
        final ApiBody apiBody = this.timetableService.getForgradebook(userId);
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
