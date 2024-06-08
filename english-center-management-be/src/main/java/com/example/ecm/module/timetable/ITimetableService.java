package com.example.ecm.module.timetable;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.timetable.request.CreateTimetableRequest;
import com.example.ecm.module.timetable.request.GetStatisticTimetableRequest;
import com.example.ecm.module.timetable.request.SearchTimetableRequest;
import com.example.ecm.module.timetable.request.UpdateTimetableRequest;
import org.springframework.lang.Nullable;

import java.util.Date;

public interface ITimetableService {

    TimetableEntity findByIdThrowIfNotPresent(Long id);

    ApiBody getByUserIdAndDay(Long userId, @Nullable Integer day, Integer status);

    ApiBody getById(Long id);

    void createTimetable(CreateTimetableRequest createTimetableRequest);

    void updateTimetable(UpdateTimetableRequest updateTimetableRequest);

    ApiBody searchTimetable(SearchRequest<SearchTimetableRequest> searchRequest);

    ApiBody statisticTimetable(SearchRequest<GetStatisticTimetableRequest> searchRequest);
}
