package com.example.ecm.module.timetable.detail.impl;

import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.model.SaveBatch;
import com.example.ecm.module.course.CourseEntity;
import com.example.ecm.module.timetable.TimetableEntity;
import com.example.ecm.module.timetable.detail.ITimetableDetailRepository;
import com.example.ecm.module.timetable.detail.ITimetableDetailService;
import com.example.ecm.module.timetable.detail.TimetableDetailEntity;
import com.example.ecm.module.timetable.detail.request.CreateTimetableDetailRequest;
import com.example.ecm.module.timetable.detail.response.IGetTimetableDetailResponse;
import com.example.ecm.module.timetable.detail.response.IUserTimetableDetailResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TimetableDetailServiceImpl implements ITimetableDetailService {

    private final JdbcTemplate jdbcTemplate;
    private final ITimetableDetailRepository timetableDetailRepository;

    @Override
    @Transactional
    public void saveBatchTimetableDetail(TimetableEntity timetableEntity, CourseEntity course, List<CreateTimetableDetailRequest> details) {
        SaveBatch<CreateTimetableDetailRequest> saveBatch = new SaveBatch<>(details, (ps, data) -> {
            final LocalTime endTime = data.getStartTime().plusHours(course.getDuration());
            ps.setInt(1, data.getDay());
            ps.setObject(2, data.getStartTime());
            ps.setLong(3, timetableEntity.getId());
            ps.setObject(4, data.getStartTime());
            ps.setObject(5, data.getStartTime());
            ps.setObject(6, endTime);
            ps.setObject(7, endTime);
            ps.setLong(8, timetableEntity.getTeacherId());
            ps.setLong(9, timetableEntity.getClassRoomId());
            ps.setInt(10, data.getDay());
        });
        final int[] rows = this.jdbcTemplate.batchUpdate("""
            INSERT INTO TB_TIMETABLE_DETAIL(DAY, START_TIME, TIMETABLE_ID)
            SELECT ?, ?, ?
            FROM DUAL
            WHERE (
                SELECT COUNT(*)
                FROM TB_TIMETABLE_DETAIL td
                    JOIN TB_TIMETABLE t ON t.ID = td.TIMETABLE_ID
                    JOIN TB_COURSE c ON c.ID = t.COURSE_ID
                WHERE t.STATUS = 1
                    AND (
                        (td.START_TIME <= ? AND ? < DATE_ADD(td.START_TIME, INTERVAL c.DURATION HOUR))
                        OR
                        (td.START_TIME < ? AND ? <= DATE_ADD(td.START_TIME, INTERVAL c.DURATION HOUR))
                    )
                    AND (t.TEACHER_ID = ? OR t.CLASS_ROOM_ID = ?)
                    AND td.DAY = ?
            ) = 0
        """, saveBatch);
        if (rows.length != details.size() || Arrays.stream(rows).anyMatch(x -> x == 0)) {
            throw new BusinessException(ErrorCode.TIMETABLE_EXIST);
        }
    }

    @Override
    @Transactional
    public void deleteByTimetableId(long timetableId) {
        this.timetableDetailRepository.deleteByTimetableId(timetableId);
    }

    @Override
    public List<IGetTimetableDetailResponse> getByTimetableId(Long timetableId) {
        return this.timetableDetailRepository.getByTimetableId(timetableId);
    }

    @Override
    public TimetableDetailEntity findByIdThrowIfNotPresent(Long timetableDetailId) {
        return this.timetableDetailRepository.findById(timetableDetailId)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
    }

    @Override
    public List<IUserTimetableDetailResponse> findByStudentId(Long userId) {
        return this.timetableDetailRepository.findByStudentId(userId);
    }

    @Override
    public List<IUserTimetableDetailResponse> findByTeacherIdAndDay(Long userId, Integer day, Integer status) {
        return this.timetableDetailRepository.findByTeacherIdAndDay(userId, day, status);
    }

}
