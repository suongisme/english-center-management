package com.example.ecm.module.course.impl;

import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.model.SearchResponse;
import com.example.ecm.module.course.CourseEntity;
import com.example.ecm.module.course.ICourseRepository;
import com.example.ecm.module.course.ICourseService;
import com.example.ecm.module.course.request.CreateCourseRequest;
import com.example.ecm.module.course.request.SearchCourserRequest;
import com.example.ecm.module.course.request.UpdateCourseRequest;
import com.example.ecm.module.course.response.ISearchCourseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements ICourseService {

    private final ICourseRepository courseRepository;

    @Override
    public CourseEntity findByIdThrowIfNotPresent(Long id) {
        return this.courseRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
    }

    @Override
    public ApiBody searchCourse(SearchRequest<SearchCourserRequest> searchRequest) {
        Pageable pageable = Pageable.unpaged();
        if (searchRequest.isPaged()) {
            pageable = PageRequest.of(searchRequest.getPageNo() - 1, searchRequest.getPageSize());
        }
        final SearchCourserRequest data = Optional.ofNullable(searchRequest.getData()).orElseGet(SearchCourserRequest::new);
        final Page<ISearchCourseResponse> page = this.courseRepository.searchBy(data, pageable);
        final SearchResponse<ISearchCourseResponse> response = SearchResponse.of(page);
        return ApiBody.of(response);
    }

    @Override
    public void createCourse(CreateCourseRequest createCourseRequest) {
        final CourseEntity entity = createCourseRequest.toEntity();
        this.courseRepository.save(entity);
    }

    @Override
    public void updateCourse(UpdateCourseRequest updateCourseRequest) {
        final CourseEntity course = this.courseRepository.findById(updateCourseRequest.getId())
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
        final CourseEntity entity = updateCourseRequest.toEntity();
        entity.setId(course.getId());
        this.courseRepository.save(entity);
    }
}
