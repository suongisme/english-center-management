package com.example.ecm.module.timetable.gradebook;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.module.timetable.gradebook.request.CreateTimetableGradeBookRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/grade-book")
@RequiredArgsConstructor
public class TimetableGradeBookController {

    private final ITimetableGradeBookService timetableGradeBookService;

    @PostMapping("/search")
    public ApiResponse searchGradebook() {
        final ApiBody apiBody = this.timetableGradeBookService.searchGradebook();
        return ApiResponse.ok(apiBody);
    }

    @GetMapping("/detail")
    public ApiResponse getDetail(@RequestParam Long id) {
        final ApiBody apiBody = this.timetableGradeBookService.getDetail(id);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('SCOPE_TEACHER')")
    public ApiResponse createGradebook(@RequestBody @Valid CreateTimetableGradeBookRequest createTimetableGradeBookRequest) {
        this.timetableGradeBookService.createGradeBook(createTimetableGradeBookRequest);
        return ApiResponse.ok();
    }
}
