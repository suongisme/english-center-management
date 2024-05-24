package com.example.ecm.module.timetable.detail;

import com.example.ecm.module.course.CourseEntity;
import com.example.ecm.module.timetable.TimetableEntity;
import com.example.ecm.module.timetable.detail.request.CreateTimetableDetailRequest;
import com.example.ecm.module.timetable.detail.response.IGetTimetableDetailResponse;
import com.example.ecm.module.timetable.detail.response.IUserTimetableDetailResponse;

import java.util.List;

public interface ITimetableDetailService {

    void saveBatchTimetableDetail(TimetableEntity timetableEntity, CourseEntity course, List<CreateTimetableDetailRequest> details);

    void deleteByTimetableId(long timetableId);

    List<IGetTimetableDetailResponse> getByTimetableId(Long timetableId);

    TimetableDetailEntity findByIdThrowIfNotPresent(Long timetableDetailId);

    List<IUserTimetableDetailResponse> findByStudentId(Long userId);

    List<IUserTimetableDetailResponse> findByTeacherIdAndDay(Long userId, Integer day, Integer status);
}
