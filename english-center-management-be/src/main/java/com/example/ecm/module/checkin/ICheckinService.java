package com.example.ecm.module.checkin;

import com.example.ecm.module.checkin.request.CreateCheckinRequest;

public interface ICheckinService {

    void createCheckin(CreateCheckinRequest request);

    void validateCheckinToday(Long timetableId);
}
