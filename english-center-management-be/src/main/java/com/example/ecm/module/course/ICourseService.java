package com.example.ecm.module.course;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.course.request.CreateCourseRequest;
import com.example.ecm.module.course.request.GetDetailCourseRequest;
import com.example.ecm.module.course.request.SearchCourserRequest;
import com.example.ecm.module.course.request.UpdateCourseRequest;

public interface ICourseService {

    ApiBody searchCourse(SearchRequest<SearchCourserRequest> searchRequest);

    CourseEntity findByIdThrowIfNotPresent(Long id);

    void createCourse(CreateCourseRequest createCourseRequest);

    void updateCourse(UpdateCourseRequest updateCourseRequest);

    ApiBody getDetailById(GetDetailCourseRequest request);
}
