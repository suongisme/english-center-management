package com.example.ecm.module.timetable.student;

import java.util.List;

public interface ITimetableStudentService {

    void saveBatchTimetableStudent(Long timetableId, List<Long> studentIds);

    void deleteByTimetableId(long timetableId);

    List<TimetableStudentEntity> findByTimetableId(long timetableId);
}
