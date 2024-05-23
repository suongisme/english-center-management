package com.example.ecm.module.timetable.gradebook;

import com.example.ecm.module.timetable.gradebook.response.ISearchGradeBookResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ITimetableGradeBookRepository extends JpaRepository<TimetableGradeBookEntity, Long> {

    @Query("""
        SELECT
            u.firstName as firstName,
            u.lastName as lastName,
            c.name as courseName,
            cr.name as classRoomName,
            g.id as id,
            g.createdBy as createdBy,
            g.createdDate as createdDate
        FROM TimetableGradeBookEntity g
            JOIN UserEntity u ON g.teacherId = u.id
            JOIN ClassRoomEntity cr ON cr.id = g.classRoomId
            JOIN CourseEntity c ON c.id = g.courseId
    """)
    Page<ISearchGradeBookResponse> searchBy(Pageable pageable);
}
