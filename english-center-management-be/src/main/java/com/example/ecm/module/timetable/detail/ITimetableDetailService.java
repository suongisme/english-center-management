package com.example.ecm.module.timetable.detail;

import java.util.List;

public interface ITimetableDetailService {

    void saveBatchTimetableDetail(Long timetableId, List<Long> studentIds);
}
