package com.example.ecm.module.timetable.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface ITimetableStudentRepository extends JpaRepository<TimetableStudentEntity, Long> {

    List<TimetableStudentEntity> findByTimetableId(long timetableId);

    @Modifying
    void deleteByTimetableId(long timetableId);
}
