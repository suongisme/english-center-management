package com.example.ecm.module.checkin;

import com.example.ecm.module.checkin.request.SearchCheckinRequest;
import com.example.ecm.module.checkin.response.IGetCheckedInResponse;
import com.example.ecm.module.checkin.response.IGetStudentAndCheckinResultResponse;
import com.example.ecm.module.checkin.response.ISearchCheckinResponse;
import com.example.ecm.module.user.response.IStudentTimetableResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ICheckinRepository extends JpaRepository<CheckinEntity, Long> {

    @Query("""
        SELECT ck
        FROM CheckinEntity ck
        WHERE ck.timetableDetailId = ?1 AND date(ck.createdDate) = current_date
    """)
    Optional<CheckinEntity> findByTimetableDetailIdAndToday(Long timetableDetailId);

    @Query("""
        SELECT
            ck.id as id,
            c.name as courseName,
            cr.name as classRoomName,
            u.firstName as firstName,
            u.lastName as lastName,
            td.startTime as startTime,
            td.day as day,
            ck.createdDate as checkinDate,
            ck.createdBy as createdBy
        FROM CheckinEntity ck
            JOIN TimetableDetailEntity td ON td.id = ck.timetableDetailId
            JOIN TimetableEntity tb ON tb.id = td.timetableId
            JOIN CourseEntity c ON c.id = tb.courseId
            JOIN ClassRoomEntity cr ON cr.id = tb.classRoomId
            JOIN UserEntity u ON u.id = tb.teacherId
        WHERE (:#{#data.courseId} IS NULL OR :#{#data.courseId} = c.id)
            AND (:#{#data.classRoomId} IS NULL OR :#{#data.classRoomId} = cr.id)
            AND (:#{#data.checkinDate} IS NULL OR :#{#data.checkinDate} = date(ck.createdDate))
            AND (:#{#data.teacherId} IS NULL OR :#{#data.teacherId} = u.id)
        ORDER BY ck.createdDate DESC
    """)
    List<ISearchCheckinResponse> searchBy(
            @Param("data") SearchCheckinRequest checkinRequest
    );

    @Query("""
        SELECT ck
        FROM CheckinEntity ck
            JOIN TimetableDetailEntity td ON td.id = ck.timetableDetailId
        WHERE td.timetableId = ?1
    """)
    List<CheckinEntity> getCheckedInByTimetableId(long timetableId);

    @Query("""
        SELECT
            u.firstName as firstName,
            u.lastName as lastName,
            u.id as id,
            cks.present as present,
            cks.note as note
        FROM TimetableDetailEntity td
            JOIN TimetableStudentEntity ts ON td.timetableId = ts.timetableId
            JOIN UserEntity u ON u.id = ts.studentId
            LEFT JOIN CheckinEntity ck ON ck.timetableDetailId = td.id AND date(ck.createdDate) = current_date
            LEFT JOIN CheckinStudentEntity cks ON cks.checkinId = ck.id AND cks.studentId = u.id
        WHERE td.id = ?1
    """)
    List<IGetStudentAndCheckinResultResponse> getByTimetableDetailId(Long timetableDetailId);

    @Query("""
        SELECT
            cks.id as id, ck.createdDate as checkedInDate,
            u.firstName as firstName, u.lastName as lastName,
            cks.present as present, cks.note as note,
            td.day as day, ck.createdBy as checkedInBy
            FROM CheckinStudentEntity cks
            JOIN CheckinEntity ck ON ck.id = cks.checkinId
            JOIN TimetableDetailEntity td ON td.id = ck.timetableDetailId
            JOIN TimetableEntity t ON t.id = td.timetableId
            JOIN UserEntity u ON u.id = cks.studentId
        WHERE td.timetableId = ?1
            AND u.username = ?2
            AND (?3 IS NULL OR td.day = ?3)
        ORDER BY ck.createdDate DESC
    """)
    List<IGetCheckedInResponse> getCheckedInByTimetableAndUserId(long timetableId, String username, Integer day);
}
