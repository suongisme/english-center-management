package com.example.ecm.module.timetable.detail;

import com.example.ecm.module.timetable.detail.response.IGetTimetableDetailResponse;
import com.example.ecm.module.timetable.detail.response.IUserTimetableDetailResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ITimetableDetailRepository extends JpaRepository<TimetableDetailEntity, Long> {

    @Modifying
    @Query("DELETE FROM TimetableDetailEntity td WHERE td.timetableId = ?1")
    void deleteByTimetableId(long id);

    @Query("""
        SELECT td.id as id, td.day as day, td.startTime as startTime
        FROM TimetableDetailEntity td
        WHERE td.timetableId = ?1
    """)
    List<IGetTimetableDetailResponse> getByTimetableId(long timetableId);

    @Query("""
        SELECT
            d.id as id,
            d.day as day,
            d.startTime as startTime,
            t.status as status, c.name as courseName,
            cr.name as classRoomName, u.firstName as firstName,
            u.lastName as lastName, c.duration as courseDuration,
            t.id as parentId
        FROM TimetableEntity t
            JOIN TimetableDetailEntity d ON d.timetableId = t.id
            JOIN CourseEntity c ON c.id = t.courseId
            JOIN ClassRoomEntity cr ON cr.id = t.classRoomId
            JOIN UserEntity u ON u.id = t.teacherId
        WHERE t.teacherId = ?1 AND (?2 IS NULL OR d.day = ?2) AND t.status = ?3
        ORDER BY d.startTime ASC
    """)
    List<IUserTimetableDetailResponse> findByTeacherIdAndDay(Long teacherId, Integer day, Integer status);

    @Query("""
        SELECT d.id as id,
            d.day as day,
            d.startTime as startTime,
            t.status as status, c.name as courseName,
            cr.name as classRoomName, u.firstName as firstName,
            u.lastName as lastName, c.duration as courseDuration,
            t.id as parentId
        FROM TimetableEntity t
            JOIN TimetableDetailEntity d ON d.timetableId = t.id
            JOIN CourseEntity c ON c.id = t.courseId
            JOIN ClassRoomEntity cr ON cr.id = t.classRoomId
            JOIN UserEntity u ON u.id = t.teacherId
            JOIN TimetableStudentEntity ts ON ts.timetableId = t.id
        WHERE t.status = 1 AND ts.studentId = ?1
        ORDER BY t.createdDate DESC
    """)
    List<IUserTimetableDetailResponse> findByStudentId(Long studentId);
}
