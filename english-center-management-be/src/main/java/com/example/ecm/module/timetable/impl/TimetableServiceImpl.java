package com.example.ecm.module.timetable.impl;

import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.module.class_room.ClassRoomEntity;
import com.example.ecm.module.class_room.IClassRoomService;
import com.example.ecm.module.course.CourseEntity;
import com.example.ecm.module.course.ICourseService;
import com.example.ecm.module.timetable.ITimetableRepository;
import com.example.ecm.module.timetable.ITimetableService;
import com.example.ecm.module.timetable.TimetableEntity;
import com.example.ecm.module.timetable.detail.ITimetableDetailService;
import com.example.ecm.module.timetable.detail.request.CreateTimetableDetailRequest;
import com.example.ecm.module.timetable.request.CreateTimetableRequest;
import com.example.ecm.module.timetable.request.UpdateTimetableRequest;
import com.example.ecm.module.user.IUserService;
import com.example.ecm.module.user.UserEntity;
import com.example.ecm.module.user.constant.RoleEnum;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.sql.Time;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class TimetableServiceImpl implements ITimetableService {

    private final ITimetableRepository timetableRepository;

    private final IUserService userService;
    private final ICourseService courseService;
    private final IClassRoomService classRoomService;
    private final ITimetableDetailService timetableDetailService;

    @Override
    public void getByUserId(Long userId) {
        final UserEntity user = this.userService.findByIdThrowIfNotPresent(userId);
        if (RoleEnum.TEACHER.name().equalsIgnoreCase(user.getRole())) {
            final Stream<TimetableEntity> byTeacherId = this.timetableRepository.findByTeacherId(userId);
            return;
        }
        final Stream<TimetableEntity> byStudentId = this.timetableRepository.findByStudentId(userId);
    }

    @Override
    @Transactional
    public void createTimetable(CreateTimetableRequest createTimetableRequest) {
        final UserEntity teacher = this.userService.findByIdThrowIfNotPresent(createTimetableRequest.getTeacherId());
        final CourseEntity course = this.courseService.findByIdThrowIfNotPresent(createTimetableRequest.getCourseId());
        final ClassRoomEntity classRoom = this.classRoomService.findByIdThrowIfNotPresent(createTimetableRequest.getClassRoomId());

        final TimetableEntity entity = createTimetableRequest.toEntity();
        final LocalTime startTime = entity.getStartTime();
        final LocalTime endTime = startTime.plus(course.getDuration(), ChronoUnit.HOURS);

        final Optional<TimetableEntity> timetableEntityOptional = this.timetableRepository.findByDuration(
                startTime,
                endTime,
                classRoom.getId(),
                teacher.getId(),
                entity.getDay()
        );

        if (timetableEntityOptional.isPresent()) {
            throw new BusinessException(ErrorCode.TIMETABLE_EXIST);
        }

        this.timetableRepository.save(entity);
        final List<Long> studentsIds = Stream.ofNullable(createTimetableRequest.getStudents())
                .flatMap(Collection::stream)
                .map(CreateTimetableDetailRequest::getStudentId)
                .toList();
        if (!CollectionUtils.isEmpty(studentsIds)) {
            this.timetableDetailService.saveBatchTimetableDetail(entity.getId(), studentsIds);
        }
    }

    @Override
    public void updateTimetable(UpdateTimetableRequest updateTimetableRequest) {

    }
}
