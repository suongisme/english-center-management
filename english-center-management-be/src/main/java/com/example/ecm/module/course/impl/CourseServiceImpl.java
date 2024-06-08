package com.example.ecm.module.course.impl;

import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.model.SearchResponse;
import com.example.ecm.module.course.CourseEntity;
import com.example.ecm.module.course.ICourseRepository;
import com.example.ecm.module.course.ICourseService;
import com.example.ecm.module.course.request.*;
import com.example.ecm.module.course.response.ISearchCourseResponse;
import com.example.ecm.module.course.response.IStatisticalCourseResponse;
import com.example.ecm.module.resource.IResourceService;
import com.example.ecm.module.resource.provider.IResourceProvider;
import com.example.ecm.module.resource.request.CreateResourceRequest;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements ICourseService {

    private final ICourseRepository courseRepository;
    private final IResourceProvider resourceProvider;

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
    @Transactional
    @SneakyThrows(Exception.class)
    public void createCourse(CreateCourseRequest createCourseRequest) {
        final CourseEntity entity = createCourseRequest.toEntity();
        this.courseRepository.save(entity);
        if (Objects.nonNull(createCourseRequest.getAvatarFile())) {
            final String avatarUrl = this.resourceProvider.saveFile(createCourseRequest.getAvatarFile(), String.format("/COURSE/%s", entity.getId()));
            entity.setAvatarUrl(avatarUrl);
            this.courseRepository.save(entity);
        }
    }

    @Override
    @SneakyThrows(Exception.class)
    @Transactional
    public void updateCourse(UpdateCourseRequest updateCourseRequest) {
        final CourseEntity course = this.courseRepository.findById(updateCourseRequest.getId())
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
        final CourseEntity entity = updateCourseRequest.toEntity();
        entity.setId(course.getId());
        if (Objects.isNull(updateCourseRequest.getAvatarFile())) {
            entity.setAvatarUrl(course.getAvatarUrl());
        } else {
            final String avatarUrl = this.resourceProvider.saveFile(updateCourseRequest.getAvatarFile(), String.format("/COURSE/%s", entity.getId()));
            entity.setAvatarUrl(avatarUrl);
        }
        this.courseRepository.save(entity);
    }

    @Override
    public ApiBody getDetailById(GetDetailCourseRequest request) {
        return this.courseRepository.getDetailById(request)
                .map(ApiBody::of)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
    }

    @Override
    public ApiBody getStatisticalCourse(SearchRequest<GetStatisticalCourseRequest> searchRequest) {
        Pageable pageable = Pageable.unpaged();
        if (searchRequest.isPaged()) {
            pageable = PageRequest.of(searchRequest.getPageNo() - 1, searchRequest.getPageSize());
        }
        final GetStatisticalCourseRequest data = Optional.ofNullable(searchRequest.getData()).orElseGet(GetStatisticalCourseRequest::new);
        final Page<IStatisticalCourseResponse> page = this.courseRepository.statisticalCourse(data, pageable);
        final SearchResponse<IStatisticalCourseResponse> response = SearchResponse.of(page);
        return ApiBody.of(response);
    }
}
