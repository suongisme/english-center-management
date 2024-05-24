package com.example.ecm.module.timetable.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ITimetableStudentRepository extends JpaRepository<TimetableStudentEntity, Long> {

    List<TimetableStudentEntity> findByTimetableId(long timetableId);

    @Modifying
    @Query("DELETE FROM TimetableStudentEntity ts WHERE ts.timetableId = ?1")
    void deleteByTimetableId(long timetableId);
}
