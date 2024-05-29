package com.example.ecm.module.checkin;

import com.example.ecm.exception.BusinessException;
import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.module.checkin.request.CreateCheckinRequest;
import com.example.ecm.module.checkin.request.SearchCheckinRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/checkin")
@RequiredArgsConstructor
public class CheckinController {

    private final ICheckinService checkinService;

    @PostMapping("/search")
    public ApiResponse searchCheckin(@RequestBody SearchCheckinRequest request) {
        final ApiBody apiBody = this.checkinService.searchCheckin(request);
        return ApiResponse.ok(apiBody);
    }

    @GetMapping("/user")
    public ApiResponse getStudentAndCheckInResult(@RequestParam Long timetableDetailId) {
        final ApiBody apiBody = this.checkinService.getStudentAndCheckinResult(timetableDetailId);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('SCOPE_TEACHER')")
    public ApiResponse createCheckin(@RequestBody @Valid CreateCheckinRequest createCheckinRequest) {
        this.checkinService.createCheckin(createCheckinRequest);
        return ApiResponse.ok();
    }

    @GetMapping("/validate-checkin-today")
    public ApiResponse validateCheckinToday(@RequestParam Long timetableDetailId) {
        try {
            this.checkinService.validateCheckinToday(timetableDetailId);
            return ApiResponse.ok(ApiBody.of(false));
        } catch (BusinessException ex) {
            return ApiResponse.ok(ApiBody.of(true));
        }
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_STUDENT')")
    @GetMapping("/get-checked-in")
    public ApiResponse getCheckedIn(@RequestParam Long timetableId, @RequestParam(required = false) Integer day) {
        ApiBody apiBody = this.checkinService.getCheckedInByTimetableId(timetableId, day);
        return ApiResponse.ok(apiBody);
    }
}
