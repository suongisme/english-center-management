package com.example.ecm.module.timetable.gradebook;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.timetable.gradebook.request.CreateTimetableGradeBookRequest;
import com.example.ecm.module.timetable.gradebook.request.GetStatisticScoreRequest;
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

    @GetMapping("/user")
    public ApiResponse getStudentAndScore(@RequestParam Long timetableId) {
        final ApiBody apiBody = this.timetableGradeBookService.getStudentAndScore(timetableId);
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

    @PostMapping("/statistic-score")
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    public ApiResponse statisticScore(@RequestBody @Valid SearchRequest<GetStatisticScoreRequest> searchRequest) {
        final ApiBody apiBody = this.timetableGradeBookService.statisticScore(searchRequest);
        return ApiResponse.ok(apiBody);
    }
}
