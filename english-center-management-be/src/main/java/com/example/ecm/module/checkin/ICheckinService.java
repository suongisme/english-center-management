package com.example.ecm.module.checkin;

import com.example.ecm.model.ApiBody;
import com.example.ecm.module.checkin.request.CreateCheckinRequest;
import com.example.ecm.module.checkin.request.SearchCheckinRequest;

public interface ICheckinService {

    void createCheckin(CreateCheckinRequest request);

    void validateCheckinToday(Long timetableId);

    ApiBody searchCheckin(SearchCheckinRequest request);

    ApiBody getStudentAndCheckinResult(Long timetableDetailId);

    ApiBody getCheckedInByTimetableId(Long timetableId, Integer day);
}
