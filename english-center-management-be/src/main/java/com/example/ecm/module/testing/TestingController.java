package com.example.ecm.module.testing;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.testing.request.CheckAnswerRequest;
import com.example.ecm.module.testing.request.CreateTestingRequest;
import com.example.ecm.module.testing.request.SearchTestingRequest;
import com.example.ecm.module.testing.request.UpdateTestingRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/testings")
@RequiredArgsConstructor
public class TestingController {

    private final ITestingService testingService;

    @GetMapping
    public ApiResponse getById(@RequestParam Long testingId) {
        final ApiBody apiBody = this.testingService.getById(testingId);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping("/search")
    public ApiResponse searchTesting(@RequestBody @Valid SearchRequest<SearchTestingRequest> searchRequest) {
        final ApiBody apiBody = this.testingService.searchTesting(searchRequest);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    public ApiResponse createTesting(@RequestBody @Valid CreateTestingRequest createTestingRequest) {
        this.testingService.createTesting(createTestingRequest);
        return ApiResponse.ok();
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    public ApiResponse updateTesting(@RequestBody @Valid UpdateTestingRequest updateTestingRequest) {
        this.testingService.updateTesting(updateTestingRequest);
        return ApiResponse.ok();
    }

    @PostMapping("/check")
    public ApiResponse checkAnswer(@RequestParam Long testingId, @RequestBody @Valid List<CheckAnswerRequest> request) {
        ApiBody apiBody = this.testingService.checkAnswer(testingId, request);
        return ApiResponse.ok(apiBody);
    }
}
