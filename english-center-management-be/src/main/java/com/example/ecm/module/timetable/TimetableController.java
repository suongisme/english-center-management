package com.example.ecm.module.timetable;

import com.example.ecm.model.ApiResponse;
import com.example.ecm.module.timetable.request.CreateTimetableRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/timetable")
@RequiredArgsConstructor
public class TimetableController {

    private final ITimetableService timetableService;

    @GetMapping("/get-by-user-id")
    public ApiResponse getTimetableByUser(@RequestParam Long userID) {

    }

    @PostMapping
    public ApiResponse createTimetable(@RequestBody @Valid CreateTimetableRequest createTimetableRequest) {
        this.timetableService.createTimetable(createTimetableRequest);
        return ApiResponse.ok();
    }
}
