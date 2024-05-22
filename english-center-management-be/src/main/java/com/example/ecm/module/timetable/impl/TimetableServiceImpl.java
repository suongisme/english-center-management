package com.example.ecm.module.timetable.impl;

import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.model.ApiBody;
import com.example.ecm.module.class_room.ClassRoomEntity;
import com.example.ecm.module.class_room.IClassRoomService;
import com.example.ecm.module.course.CourseEntity;
import com.example.ecm.module.course.ICourseService;
import com.example.ecm.module.timetable.ITimetableRepository;
import com.example.ecm.module.timetable.ITimetableService;
import com.example.ecm.module.timetable.TimetableEntity;
import com.example.ecm.module.timetable.request.CreateTimetableRequest;
import com.example.ecm.module.timetable.request.UpdateTimetableRequest;
import com.example.ecm.module.timetable.response.GetTimetableResponse;
import com.example.ecm.module.timetable.response.IUserTimetableResponse;
import com.example.ecm.module.timetable.student.ITimetableStudentService;
import com.example.ecm.module.timetable.student.TimetableStudentEntity;
import com.example.ecm.module.timetable.student.request.CreateTimetableStudentRequest;
import com.example.ecm.module.user.IUserService;
import com.example.ecm.module.user.UserEntity;
import com.example.ecm.module.user.constant.RoleEnum;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.LocalTime;
import java.util.*;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class TimetableServiceImpl implements ITimetableService {

    private final ITimetableRepository timetableRepository;

    private final IUserService userService;
    private final ICourseService courseService;
    private final IClassRoomService classRoomService;
    private final ITimetableStudentService timetableStudentService;

    @Override
    public TimetableEntity findByIdThrowIfNotPresent(Long id) {
        return this.timetableRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
    }

    @Override
    public ApiBody getByUserIdAndDay(Long userId, Integer day, Integer status) {
        final UserEntity user = this.userService.findByIdThrowIfNotPresent(userId);
        List<IUserTimetableResponse> response;
        if (RoleEnum.TEACHER.name().equalsIgnoreCase(user.getRole())) {
            response = this.timetableRepository.findByTeacherIdAndDay(userId, day, status);
        } else {
            response = this.timetableRepository.findByStudentId(userId);
        }
        return ApiBody.of(response);
    }

    @Override
    public ApiBody getForgradebook(Long userId) {
        final List<IUserTimetableResponse> response = this.timetableRepository.getForGradebook(userId);
        return ApiBody.of(response);
    }

    @Override
    public ApiBody getById(Long id) {
        return this.timetableRepository.findById(id)
                .map(GetTimetableResponse::from)
                .map(dto -> {
                    final List<Long> studentIds = this.timetableStudentService.findByTimetableId(dto.getId())
                            .stream()
                            .map(TimetableStudentEntity::getStudentId)
                            .toList();
                    dto.setStudents(studentIds);
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
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
        this.timetableStudentService.deleteByTimetableId(timetable.getId());
        this.saveTimetable(updateTimetableRequest, timetable);
    }

    private void saveTimetable(CreateTimetableRequest createTimetableRequest, TimetableEntity timetableEntity) {
        final UserEntity teacher = this.userService.findByIdThrowIfNotPresent(createTimetableRequest.getTeacherId());
        final CourseEntity course = this.courseService.findByIdThrowIfNotPresent(createTimetableRequest.getCourseId());
        final ClassRoomEntity classRoom = this.classRoomService.findByIdThrowIfNotPresent(createTimetableRequest.getClassRoomId());

        final TimetableEntity entity = createTimetableRequest.toEntity();
        if (Objects.nonNull(timetableEntity)) {
            entity.setId(timetableEntity.getId());
        }
        final LocalTime startTime = entity.getStartTime();
        final LocalTime endTime = startTime.plusHours(course.getDuration());

        final Optional<TimetableEntity> timetableEntityOptional = this.timetableRepository.findByDuration(
                        startTime,
                        endTime,
                        classRoom.getId(),
                        teacher.getId(),
                        entity.getDay()
                )
                .filter(x -> Objects.isNull(entity.getId()) || !x.getId().equals(entity.getId()));

        if (timetableEntityOptional.isPresent()) {
            throw new BusinessException(ErrorCode.TIMETABLE_EXIST);
        }

        this.timetableRepository.save(entity);
        final List<Long> studentsIds = Stream.ofNullable(createTimetableRequest.getStudents())
                .flatMap(Collection::stream)
                .map(CreateTimetableStudentRequest::getStudentId)
                .toList();
        if (!CollectionUtils.isEmpty(studentsIds)) {
            this.timetableStudentService.saveBatchTimetableStudent(entity.getId(), studentsIds);
        }
    }
}
