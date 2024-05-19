package com.example.ecm.module.course;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.course.request.CreateCourseRequest;
import com.example.ecm.module.course.request.SearchCourserRequest;
import com.example.ecm.module.course.request.UpdateCourseRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    private final ICourseService courseService;

    @PostMapping("/search")
    public ApiResponse searchCourse(@RequestBody @Valid SearchRequest<SearchCourserRequest> searchRequest) {
        final ApiBody apiBody = this.courseService.searchCourse(searchRequest);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping
    public ApiResponse createCourse(@RequestBody @Valid CreateCourseRequest createCourseRequest) {
        this.courseService.createCourse(createCourseRequest);
        return ApiResponse.ok();
    }

    @PutMapping
    public ApiResponse updateCourse(@RequestBody @Valid UpdateCourseRequest updateCourseRequest) {
        this.courseService.updateCourse(updateCourseRequest);
        return ApiResponse.ok();
    }
}
