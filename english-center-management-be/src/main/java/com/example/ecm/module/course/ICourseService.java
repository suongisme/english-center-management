package com.example.ecm.module.course;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.course.request.*;

public interface ICourseService {

    ApiBody searchCourse(SearchRequest<SearchCourserRequest> searchRequest);

    CourseEntity findByIdThrowIfNotPresent(Long id);

    void createCourse(CreateCourseRequest createCourseRequest);

    void updateCourse(UpdateCourseRequest updateCourseRequest);

    ApiBody getDetailById(GetDetailCourseRequest request);

    ApiBody getStatisticalCourse(SearchRequest<GetStatisticalCourseRequest> searchRequest);
}
