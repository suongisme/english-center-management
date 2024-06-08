package com.example.ecm.module.timetable;

import com.example.ecm.module.timetable.request.GetStatisticTimetableRequest;
import com.example.ecm.module.timetable.request.SearchTimetableRequest;
import com.example.ecm.module.timetable.response.IGetStatisticalTimetableResponse;
import com.example.ecm.module.timetable.response.ISearchTimetableResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ITimetableRepository extends JpaRepository<TimetableEntity, Long> {

    @Query("""
                SELECT
                    t.id as id,
                    t.status as status,
                    c.name as courseName,
                    cr.name as classRoomName, u.firstName as firstName,
                    u.lastName as lastName
                FROM TimetableEntity t
                    JOIN CourseEntity c ON c.id = t.courseId
                    JOIN ClassRoomEntity cr ON cr.id = t.classRoomId
                    JOIN UserEntity u ON u.id = t.teacherId
                WHERE (:#{#data.teacherId} IS NULL OR t.teacherId = :#{#data.teacherId})
                    AND (:#{#data.status} IS NULL OR t.status = :#{#data.status})
                    AND (:#{#data.studentId} IS NULL OR :#{#data.studentId} IN (
                        SELECT ts.studentId FROM TimetableStudentEntity ts
                        WHERE ts.timetableId = t.id
                    ))
                    AND (:#{#data.scored} IS NULL OR :#{#data.scored} = (
                        SELECT case when count(g.id) = 1 then true else false end FROM TimetableGradeBookEntity g
                        WHERE g.timetableId = t.id
                    ) )
            """)
    Page<ISearchTimetableResponse> searchBy(
            @Param("data") SearchTimetableRequest data,
            Pageable pageable
    );

    @Query("""
        SELECT
            tb.id as id,
            tb.status as status,
            cr.name as className,
            (SELECT count(1) FROM TimetableStudentEntity tbs WHERE tbs.timetableId = tb.id) as totalStudent,
            u.firstName as firstName,
            u.lastName as lastName
        FROM TimetableEntity tb
            JOIN ClassRoomEntity cr ON cr.id = tb.classRoomId
            JOIN UserEntity u ON tb.teacherId = u.id
        WHERE (:#{#data.courseId} IS NULL OR tb.courseId = :#{#data.courseId})
    """)
    Page<IGetStatisticalTimetableResponse> statisticTimetable(GetStatisticTimetableRequest data, Pageable pageable);
}
