package com.example.ecm.module.checkin;

import com.example.ecm.exception.BusinessException;
import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.module.checkin.request.CreateCheckinRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/checkin")
@RequiredArgsConstructor
public class CheckinController {

    private final ICheckinService checkinService;

    @PostMapping
    public ApiResponse createCheckin(@RequestBody @Valid CreateCheckinRequest createCheckinRequest) {
        this.checkinService.createCheckin(createCheckinRequest);
        return ApiResponse.ok();
    }

    @GetMapping("/validate-checkin-today")
    public ApiResponse validateCheckinToday(@RequestParam Long timetableId) {
        try {
            this.checkinService.validateCheckinToday(timetableId);
            return ApiResponse.ok(ApiBody.of(false));
        } catch (BusinessException ex) {
            return ApiResponse.ok(ApiBody.of(true));
        }
    }
}
