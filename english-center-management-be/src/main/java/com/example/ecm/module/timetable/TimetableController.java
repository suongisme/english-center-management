package com.example.ecm.module.timetable;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.timetable.request.CreateTimetableRequest;
import com.example.ecm.module.timetable.request.GetStatisticTimetableRequest;
import com.example.ecm.module.timetable.request.SearchTimetableRequest;
import com.example.ecm.module.timetable.request.UpdateTimetableRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PostMapping("/search")
    public ApiResponse searchTimetable(@RequestBody SearchRequest<SearchTimetableRequest> searchRequest) {
        final ApiBody apiBody = this.timetableService.searchTimetable(searchRequest);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    public ApiResponse createTimetable(@RequestBody @Valid CreateTimetableRequest createTimetableRequest) {
        this.timetableService.createTimetable(createTimetableRequest);
        return ApiResponse.ok();
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    public ApiResponse updateTimetable(@RequestBody @Valid UpdateTimetableRequest updateTimetableRequest) {
        this.timetableService.updateTimetable(updateTimetableRequest);
        return ApiResponse.ok();
    }

    @PostMapping("/statistic-timetable")
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    public ApiResponse getStatisticTimetable(@RequestBody SearchRequest<GetStatisticTimetableRequest> searchRequest) {
        final ApiBody apiBody = this.timetableService.statisticTimetable(searchRequest);
        return ApiResponse.ok(apiBody);
    }
}
