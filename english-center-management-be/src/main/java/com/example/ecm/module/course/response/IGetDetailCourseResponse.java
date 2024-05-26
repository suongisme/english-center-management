package com.example.ecm.module.course.response;

import org.springframework.data.web.ProjectedPayload;

@ProjectedPayload
public interface IGetDetailCourseResponse extends ISearchCourseResponse {

    String getDescription();
}
