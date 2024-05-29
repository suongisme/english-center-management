package com.example.ecm.module.checkin.impl;

import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.model.ApiBody;
import com.example.ecm.module.checkin.CheckinEntity;
import com.example.ecm.module.checkin.ICheckinRepository;
import com.example.ecm.module.checkin.ICheckinService;
import com.example.ecm.module.checkin.request.CreateCheckinRequest;
import com.example.ecm.module.checkin.request.SearchCheckinRequest;
import com.example.ecm.module.checkin.response.IGetCheckedInResponse;
import com.example.ecm.module.checkin.response.ISearchCheckinResponse;
import com.example.ecm.module.checkin.student.ICheckinStudentService;
import com.example.ecm.module.timetable.ITimetableService;
import com.example.ecm.module.timetable.TimetableEntity;
import com.example.ecm.module.timetable.detail.ITimetableDetailService;
import com.example.ecm.module.timetable.detail.TimetableDetailEntity;
import com.example.ecm.module.user.IUserService;
import com.example.ecm.module.user.UserEntity;
import com.example.ecm.utils.AuthenticationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CheckinServiceImpl implements ICheckinService {

    private final ICheckinRepository checkinRepository;

    private final ITimetableService timetableService;
    private final ITimetableDetailService timetableDetailService;
    private final ICheckinStudentService checkinStudentService;
    private final IUserService userService;

    @Override
    @Transactional
    public void createCheckin(CreateCheckinRequest request) {
        final TimetableDetailEntity timetableDetailEntity = this.timetableDetailService.findByIdThrowIfNotPresent(request.getTimetableDetailId());
        final TimetableEntity timetable = this.timetableService.findByIdThrowIfNotPresent(timetableDetailEntity.getTimetableId());
        final UserEntity teacher = this.userService.findByIdThrowIfNotPresent(timetable.getTeacherId());
        if (!teacher.getUsername().equalsIgnoreCase(AuthenticationUtil.getUsername())) {
            throw new BusinessException(ErrorCode.FORBIDDEN);
        }
        this.validateCheckinToday(timetableDetailEntity.getId());
        final CheckinEntity entity = request.toEntity();
        this.checkinRepository.save(entity);
        this.checkinStudentService.saveBatch(entity.getId(), request.getDetails());
    }

    @Override
    public void validateCheckinToday(Long timetableDetailId) {
        final Optional<CheckinEntity> checkinToday = this.checkinRepository.findByTimetableDetailIdAndToday(timetableDetailId);
        if (checkinToday.isPresent()) {
            throw new BusinessException(ErrorCode.VALIDATE_FAIL, "Lịch dạy đã được điểm danh");
        }
    }

    @Override
    public ApiBody searchCheckin(SearchCheckinRequest request) {
        final List<ISearchCheckinResponse> response = this.checkinRepository.searchBy(request);
        return ApiBody.of(response);
    }

    @Override
    public ApiBody getStudentAndCheckinResult(Long timetableDetailId) {
        return ApiBody.of(this.checkinRepository.getByTimetableDetailId(timetableDetailId));
    }

    @Override
    public ApiBody getCheckedInByTimetableId(Long timetableId, Integer day) {
        final String username = AuthenticationUtil.getUsername();
        final List<IGetCheckedInResponse> response = this.checkinRepository.getCheckedInByTimetableAndUserId(timetableId, username, day);
        return ApiBody.of(response);
    }
}
