package com.example.ecm.module.bill.detail;


import java.util.List;

public interface IBillDetailService {

    void unasignTimetableId(long timetableId);

    void assignTimetableId(long timetableId, long courseId, List<Long> studentIds);
}
