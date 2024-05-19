package com.example.ecm.module.timetable.detail.impl;

import com.example.ecm.module.timetable.detail.ITimetableDetailService;
import com.example.ecm.module.timetable.detail.TimetableDetailEntity;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TimetableDetailServiceImpl implements ITimetableDetailService {

    private final JdbcTemplate jdbcTemplate;

    @Override
    @Transactional
    public void saveBatchTimetableDetail(Long timetableId, List<Long> studentIds) {

        BatchPreparedStatementSetter batchPreparedStatementSetter = new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                final Long studentId = studentIds.get(i);
                ps.setLong(1, studentId);
                ps.setLong(2, timetableId);
            }

            @Override
            public int getBatchSize() {
                return studentIds.size();
            }
        };

        this.jdbcTemplate.batchUpdate("INSERT INTO TB_TIMETABLE_DETAIL(STUDENT_ID, TIMETABLE_ID) VALUES(?, ?)", batchPreparedStatementSetter);
    }
}
