package com.example.ecm.module.timetable;

import com.example.ecm.module.timetable.response.IUserTimetableResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface ITimetableRepository extends JpaRepository<TimetableEntity, Long> {

    @Query(
            nativeQuery = true,
            value = """
                SELECT t.* FROM TB_TIMETABLE t
                    JOIN TB_COURSE c ON c.id = t.COURSE_ID
                WHERE t.STATUS = 1
                    AND (
                        (t.START_TIME <= :startTime AND :startTime < DATE_ADD(t.START_TIME, INTERVAL c.DURATION HOUR))
                        OR
                        (t.START_TIME < :endTime AND :endTime <= DATE_ADD(t.START_TIME, INTERVAL c.DURATION HOUR))
                    )
                    AND (t.TEACHER_ID = :teacherId OR t.CLASS_ROOM_ID = :classRoomId)
                    AND t.DAY = :day
            """
    )
    Optional<TimetableEntity> findByDuration(
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime,
            @Param("classRoomId") Long classRoomId,
            @Param("teacherId") Long teacherId,
            @Param("day") Integer day
    );

    @Query("""
        SELECT t.id as id,
            t.day as day, t.startTime as startTime,
            t.status as status, c.name as courseName,
            cr.name as classRoomName, u.firstName as firstName,
            u.lastName as lastName, c.duration as courseDuration
        FROM TimetableEntity t
            JOIN CourseEntity c ON c.id = t.courseId
            JOIN ClassRoomEntity cr ON cr.id = t.classRoomId
            JOIN UserEntity u ON u.id = t.teacherId
        WHERE t.teacherId = ?1 AND (?2 IS NULL OR t.day = ?2) AND t.status = ?3
        ORDER BY t.startTime ASC
    """)
    List<IUserTimetableResponse> findByTeacherIdAndDay(Long teacherId, Integer day, Integer status);

    @Query("""
        SELECT t.id as id,
            t.day as day, t.startTime as startTime,
            t.status as status, c.name as courseName,
            cr.name as classRoomName, u.firstName as firstName,
            u.lastName as lastName, c.duration as courseDuration
        FROM TimetableEntity t
            JOIN CourseEntity c ON c.id = t.courseId
            JOIN ClassRoomEntity cr ON cr.id = t.classRoomId
            JOIN UserEntity u ON u.id = t.teacherId
        WHERE t.teacherId = ?1 AND t.status = 0
        GROUP BY t.classRoomId, t.courseId, t.teacherId
        ORDER BY t.startTime ASC
    """)
    List<IUserTimetableResponse> getForGradebook(Long teacherId);

    @Query("""
        SELECT t.id as id,
            t.day as day, t.startTime as startTime,
            t.status as status, c.name as courseName,
            cr.name as classRoomName, u.firstName as firstName,
            u.lastName as lastName, c.duration as courseDuration
        FROM TimetableEntity t
            JOIN CourseEntity c ON c.id = t.courseId
            JOIN ClassRoomEntity cr ON cr.id = t.classRoomId
            JOIN UserEntity u ON u.id = t.teacherId
            JOIN TimetableStudentEntity d ON d.timetableId = t.id
        WHERE t.status = 1 AND d.studentId = ?1
        ORDER BY t.startTime ASC
    """)
    List<IUserTimetableResponse> findByStudentId(Long studentId);

}
