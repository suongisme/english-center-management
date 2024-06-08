package com.example.ecm.module.course;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.course.request.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    private final ICourseService courseService;

    @GetMapping
    public ApiResponse getDetailById(GetDetailCourseRequest request) {
        ApiBody apiBody = this.courseService.getDetailById(request);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping("/search")
    public ApiResponse searchCourse(@RequestBody @Valid SearchRequest<SearchCourserRequest> searchRequest) {
        final ApiBody apiBody = this.courseService.searchCourse(searchRequest);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse createCourse(@Valid CreateCourseRequest createCourseRequest) {
        this.courseService.createCourse(createCourseRequest);
        return ApiResponse.ok();
    }

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse updateCourse(@Valid UpdateCourseRequest updateCourseRequest) {
        this.courseService.updateCourse(updateCourseRequest);
        return ApiResponse.ok();
    }

    @PostMapping("/statistical-course")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse getStatisticalCourse(@RequestBody @Valid SearchRequest<GetStatisticalCourseRequest> searchRequest) {
        final ApiBody apiBody = this.courseService.getStatisticalCourse(searchRequest);
        return ApiResponse.ok(apiBody);
    }
}
