package com.example.ecm.module.checkin;

import com.example.ecm.module.checkin.request.SearchCheckinRequest;
import com.example.ecm.module.checkin.response.ISearchCheckinResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ICheckinRepository extends JpaRepository<CheckinEntity, Long> {

    @Query("SELECT ck FROM CheckinEntity ck WHERE ck.timetableId = ?1 AND date(ck.createdDate) = current_date")
    Optional<CheckinEntity> findByTimetableIdAndToday(Long timetableId);

    @Query("""
        SELECT
            ck.id as id,
            c.name as courseName,
            cr.name as classRoomName,
            u.firstName as firstName,
            u.lastName as lastName,
            tb.startTime as startTime,
            tb.day as day,
            ck.createdDate as checkinDate,
            ck.createdBy as createdBy
        FROM CheckinEntity ck
            JOIN TimetableEntity tb ON ck.timetableId = tb.id
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
}
