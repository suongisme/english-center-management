package com.example.ecm.module.timetable;

import com.example.ecm.module.timetable.request.CreateTimetableRequest;
import com.example.ecm.module.timetable.request.UpdateTimetableRequest;

public interface ITimetableService {

    void getByUserId(Long userId);

    void createTimetable(CreateTimetableRequest createTimetableRequest);

    void updateTimetable(UpdateTimetableRequest updateTimetableRequest);
}
