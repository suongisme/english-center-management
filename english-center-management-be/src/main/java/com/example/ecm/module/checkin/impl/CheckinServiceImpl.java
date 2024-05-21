package com.example.ecm.module.checkin.impl;

import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.module.checkin.CheckinEntity;
import com.example.ecm.module.checkin.ICheckinRepository;
import com.example.ecm.module.checkin.ICheckinService;
import com.example.ecm.module.checkin.request.CreateCheckinRequest;
import com.example.ecm.module.checkin.student.ICheckinStudentService;
import com.example.ecm.module.timetable.ITimetableService;
import com.example.ecm.module.timetable.TimetableEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CheckinServiceImpl implements ICheckinService {

    private final ICheckinRepository checkinRepository;

    private final ITimetableService timetableService;
    private final ICheckinStudentService checkinStudentService;

    @Override
    @Transactional
    public void createCheckin(CreateCheckinRequest request) {
        final TimetableEntity timetable = this.timetableService.findByIdThrowIfNotPresent(request.getTimetableId());
        this.validateCheckinToday(timetable.getId());
        final CheckinEntity entity = request.toEntity();
        this.checkinRepository.save(entity);
        this.checkinStudentService.saveBatch(entity.getId(), request.getDetails());
    }

    @Override
    public void validateCheckinToday(Long timetableId) {
        final Optional<CheckinEntity> checkinToday = this.checkinRepository.findByTimetableIdAndToday(timetableId);
        if (checkinToday.isPresent()) {
            throw new BusinessException(ErrorCode.VALIDATE_FAIL, "Lịch dạy đã được điểm danh");
        }
    }
}
