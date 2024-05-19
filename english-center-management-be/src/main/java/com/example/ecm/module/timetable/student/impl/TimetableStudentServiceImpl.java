package com.example.ecm.module.timetable.student.impl;

import com.example.ecm.module.timetable.student.ITimetableStudentRepository;
import com.example.ecm.module.timetable.student.ITimetableStudentService;
import com.example.ecm.module.timetable.student.TimetableStudentEntity;
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
public class TimetableStudentServiceImpl implements ITimetableStudentService {

    private final JdbcTemplate jdbcTemplate;
    private final ITimetableStudentRepository timetableStudentRepository;

    @Override
    @Transactional
    public void saveBatchTimetableStudent(Long timetableId, List<Long> studentIds) {

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

        this.jdbcTemplate.batchUpdate("INSERT INTO TB_TIMETABLE_STUDENT(STUDENT_ID, TIMETABLE_ID) VALUES(?, ?)", batchPreparedStatementSetter);
    }

    @Override
    @Transactional
    public void deleteByTimetableId(long timetableId) {
        this.timetableStudentRepository.deleteByTimetableId(timetableId);
    }

    @Override
    public List<TimetableStudentEntity> findByTimetableId(long timetableId) {
        return this.timetableStudentRepository.findByTimetableId(timetableId);
    }
}
