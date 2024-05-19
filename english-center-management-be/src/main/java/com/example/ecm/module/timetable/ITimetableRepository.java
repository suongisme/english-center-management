package com.example.ecm.module.timetable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalTime;
import java.util.Optional;
import java.util.stream.Stream;

public interface ITimetableRepository extends JpaRepository<TimetableEntity, Long> {

    @Query(
            nativeQuery = true,
            value = "SELECT t.* FROM TB_TIMETABLE t" +
                    " JOIN TB_COURSE c ON c.id = t.COURSE_ID" +
                    " WHERE t.STATUS = 1" +
                    "  AND (" +
                    "   (t.START_TIME >= :startTime AND :startTime <= DATE_ADD(t.START_TIME, INTERVAL c.DURATION HOUR))" +
                    "    OR (t.START_TIME <= :endTime AND :endTime <= DATE_ADD(t.START_TIME, INTERVAL c.DURATION HOUR))" +
                    " )" +
                    " AND (t.TEACHER_ID = :teacherId OR t.CLASS_ROOM_ID = :classRoomId)" +
                    " AND t.DAY = :day"
    )
    Optional<TimetableEntity> findByDuration(
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime,
            @Param("classRoomId") Long classRoomId,
            @Param("teacherId") Long teacherId,
            @Param("day") Integer day
    );

    @Query("SELECT t FROM TimetableEntity t WHERE t.status = 1 AND t.teacherId = ?1")
    Stream<TimetableEntity> findByTeacherId(Long teacherId);

    @Query("SELECT t FROM TimetableEntity t JOIN TimetableDetailEntity td ON t.id = td.timetableId" +
            " WHERE td.studentId = ?1 AND t.status = 1")
    Stream<TimetableEntity> findByStudentId(Long studentId);
}
