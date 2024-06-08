package com.example.ecm.module.course.response;

import org.springframework.beans.factory.annotation.Value;

public interface IStatisticalCourseResponse {
    Long getId();
    String getName();
    Long getTotalActiveTimetable();
    Long getTotalFinishTimetable();

    @Value("#{target.totalActiveTimetable + target.totalFinishTimetable}")
    Long getTotalTimetable();

    Long getTotalStudent();
}

