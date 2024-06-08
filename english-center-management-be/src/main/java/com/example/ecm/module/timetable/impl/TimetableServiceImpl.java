package com.example.ecm.module.timetable.impl;

import com.example.ecm.constant.AppConstant;
import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.model.SearchResponse;
import com.example.ecm.module.bill.detail.IBillDetailService;
import com.example.ecm.module.checkin.CheckinEntity;
import com.example.ecm.module.checkin.ICheckinRepository;
import com.example.ecm.module.class_room.IClassRoomService;
import com.example.ecm.module.course.CourseEntity;
import com.example.ecm.module.course.ICourseService;
import com.example.ecm.module.timetable.ITimetableRepository;
import com.example.ecm.module.timetable.ITimetableService;
import com.example.ecm.module.timetable.TimetableEntity;
import com.example.ecm.module.timetable.detail.ITimetableDetailService;
import com.example.ecm.module.timetable.detail.response.IGetTimetableDetailResponse;
import com.example.ecm.module.timetable.request.CreateTimetableRequest;
import com.example.ecm.module.timetable.request.GetStatisticTimetableRequest;
import com.example.ecm.module.timetable.request.SearchTimetableRequest;
import com.example.ecm.module.timetable.request.UpdateTimetableRequest;
import com.example.ecm.module.timetable.response.GetTimetableResponse;
import com.example.ecm.module.timetable.detail.response.IUserTimetableDetailResponse;
import com.example.ecm.module.timetable.response.IGetStatisticalTimetableResponse;
import com.example.ecm.module.timetable.response.ISearchTimetableResponse;
import com.example.ecm.module.timetable.student.ITimetableStudentService;
import com.example.ecm.module.timetable.student.TimetableStudentEntity;
import com.example.ecm.module.timetable.student.request.CreateTimetableStudentRequest;
import com.example.ecm.module.user.IUserService;
import com.example.ecm.module.user.UserEntity;
import com.example.ecm.module.user.constant.RoleEnum;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class TimetableServiceImpl implements ITimetableService {

    private final ITimetableRepository timetableRepository;
    private final ICheckinRepository checkinRepository;

    private final IUserService userService;
    private final ICourseService courseService;
    private final IClassRoomService classRoomService;
    private final ITimetableStudentService timetableStudentService;
    private final ITimetableDetailService timetableDetailService;
    private final IBillDetailService billDetailService;

    @Override
    public TimetableEntity findByIdThrowIfNotPresent(Long id) {
        return this.timetableRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
    }

    @Override
    public ApiBody getByUserIdAndDay(Long userId, Integer day, Integer status) {
        final UserEntity user = this.userService.findByIdThrowIfNotPresent(userId);
        List<IUserTimetableDetailResponse> response;
        if (RoleEnum.TEACHER.name().equalsIgnoreCase(user.getRole())) {
            response = this.timetableDetailService.findByTeacherIdAndDay(userId, day, status);
        } else {
            response = this.timetableDetailService.findByStudentId(userId);
        }
        return ApiBody.of(response);
    }

    @Override
    public ApiBody getById(Long id) {
        return this.timetableRepository.findById(id)
                .map(GetTimetableResponse::from)
                .map(dto -> {
                    List<Long> studentIds = this.timetableStudentService.findByTimetableId(dto.getId())
                            .stream()
                            .map(TimetableStudentEntity::getStudentId)
                            .toList();
                    List<IGetTimetableDetailResponse> details = this.timetableDetailService.getByTimetableId(dto.getId());
                    dto.setStudents(studentIds);
                    dto.setDetails(details);
                    return dto;
                })
                .map(ApiBody::of)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
    }

    @Override
    @Transactional
    public void createTimetable(CreateTimetableRequest createTimetableRequest) {
        this.saveTimetable(createTimetableRequest, null);
    }

    @Override
    @Transactional
    public void updateTimetable(UpdateTimetableRequest updateTimetableRequest) {
        final TimetableEntity timetable = this.timetableRepository.findById(updateTimetableRequest.getId())
                .filter(x -> AppConstant.ACTIVE == x.getStatus())
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
        final List<CheckinEntity> checkedIn = this.checkinRepository.getCheckedInByTimetableId(updateTimetableRequest.getId());
        if (!CollectionUtils.isEmpty(checkedIn)) {
            throw new BusinessException(ErrorCode.TIMETABLE_CHECKED_IN);
        }
        this.billDetailService.unasignTimetableId(timetable.getId());
        this.timetableStudentService.deleteByTimetableId(timetable.getId());
        this.timetableDetailService.deleteByTimetableId(timetable.getId());
        this.saveTimetable(updateTimetableRequest, timetable);
    }

    private void saveTimetable(CreateTimetableRequest createTimetableRequest, TimetableEntity timetableEntity) {
        this.userService.findByIdThrowIfNotPresent(createTimetableRequest.getTeacherId());
        final CourseEntity course = this.courseService.findByIdThrowIfNotPresent(createTimetableRequest.getCourseId());
        this.classRoomService.findByIdThrowIfNotPresent(createTimetableRequest.getClassRoomId());

        final TimetableEntity entity = createTimetableRequest.toEntity();
        entity.setStatus(AppConstant.ACTIVE);
        entity.setCheckDuplicate(String.format("%s-%s-%s-%s", entity.getClassRoomId(), entity.getCourseId(), entity.getTeacherId(), AppConstant.ACTIVE));
        if (Objects.nonNull(timetableEntity)) {
            entity.setId(timetableEntity.getId());
        }

        try {
            this.timetableRepository.save(entity);
        } catch (DataIntegrityViolationException ex) {
            throw new BusinessException(ErrorCode.TIMETABLE_EXIST);
        }

        final List<Long> studentsIds = Stream.ofNullable(createTimetableRequest.getStudents())
                .flatMap(Collection::stream)
                .map(CreateTimetableStudentRequest::getStudentId)
                .toList();
        if (!CollectionUtils.isEmpty(studentsIds)) {
            this.billDetailService.assignTimetableId(entity.getId(), course.getId(), studentsIds);
            this.timetableStudentService.saveBatchTimetableStudent(entity.getId(), studentsIds);
        }
        if (!CollectionUtils.isEmpty(createTimetableRequest.getDetails())) {
            this.timetableDetailService.saveBatchTimetableDetail(entity, course, createTimetableRequest.getDetails());
        }
    }

    @Override
    public ApiBody searchTimetable(SearchRequest<SearchTimetableRequest> searchRequest) {
        Pageable pageable = Pageable.unpaged();
        if (searchRequest.isPaged()) {
            pageable = PageRequest.of(searchRequest.getPageNo() - 1, searchRequest.getPageSize(), Sort.Direction.DESC, "createdDate");
        }
        final SearchTimetableRequest data = Optional.ofNullable(searchRequest.getData()).orElseGet(SearchTimetableRequest::new);
        final Page<ISearchTimetableResponse> page = this.timetableRepository.searchBy(data, pageable);
        final SearchResponse<ISearchTimetableResponse> response = SearchResponse.of(page);
        return ApiBody.of(response);
    }

    @Override
    public ApiBody statisticTimetable(SearchRequest<GetStatisticTimetableRequest> searchRequest) {
        Pageable pageable = Pageable.unpaged();
        if (searchRequest.isPaged()) {
            pageable = PageRequest.of(searchRequest.getPageNo() - 1, searchRequest.getPageSize(), Sort.Direction.DESC, "createdDate");
        }
        final GetStatisticTimetableRequest data = Optional.ofNullable(searchRequest.getData()).orElseGet(GetStatisticTimetableRequest::new);
        final Page<IGetStatisticalTimetableResponse> page = this.timetableRepository.statisticTimetable(data, pageable);
        final SearchResponse<IGetStatisticalTimetableResponse> response = SearchResponse.of(page);
        return ApiBody.of(response);
    }
}
