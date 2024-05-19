package com.example.ecm.module.timetable;

import com.example.ecm.model.ApiBody;
import com.example.ecm.module.timetable.request.CreateTimetableRequest;
import com.example.ecm.module.timetable.request.UpdateTimetableRequest;

public interface ITimetableService {

    ApiBody getByUserId(Long userId);

    ApiBody getById(Long id);

    void createTimetable(CreateTimetableRequest createTimetableRequest);

    void updateTimetable(UpdateTimetableRequest updateTimetableRequest);
}
