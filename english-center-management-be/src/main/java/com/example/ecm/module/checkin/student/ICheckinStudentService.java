package com.example.ecm.module.checkin.student;

import com.example.ecm.module.checkin.student.request.CreateCheckinStudentRequest;

import java.util.List;

public interface ICheckinStudentService {

    void saveBatch(Long checkin, List<CreateCheckinStudentRequest> requests);
}
