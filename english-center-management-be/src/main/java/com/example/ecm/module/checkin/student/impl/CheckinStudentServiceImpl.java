package com.example.ecm.module.checkin.student.impl;

import com.example.ecm.model.SaveBatch;
import com.example.ecm.module.checkin.student.ICheckinStudentService;
import com.example.ecm.module.checkin.student.request.CreateCheckinStudentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CheckinStudentServiceImpl implements ICheckinStudentService {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void saveBatch(Long checkin, List<CreateCheckinStudentRequest> requests) {
        SaveBatch<CreateCheckinStudentRequest> saveBatch = new SaveBatch<>(requests, (ps, data) -> {
            ps.setLong(1, checkin);
            ps.setLong(2, data.getStudentId());
            ps.setBoolean(3, Optional.ofNullable(data.getPresent()).orElse(Boolean.FALSE));
            ps.setString(4, data.getNote());
        });
        this.jdbcTemplate.batchUpdate("INSERT INTO TB_CHECKIN_STUDENT(CHECKIN_ID, STUDENT_ID, PRESENT, NOTE) VALUES(?, ?, ?, ?)", saveBatch);
    }
}
