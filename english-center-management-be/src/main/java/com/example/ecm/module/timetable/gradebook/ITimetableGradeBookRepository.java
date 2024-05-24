package com.example.ecm.module.timetable.gradebook;

import com.example.ecm.module.timetable.gradebook.response.IGetGradeBookDetailResponse;
import com.example.ecm.module.timetable.gradebook.response.ISearchGradeBookResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

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
            JOIN TimetableEntity t ON g.timetableId = t.id
            JOIN UserEntity u ON t.teacherId = u.id
            JOIN ClassRoomEntity cr ON cr.id = t.classRoomId
            JOIN CourseEntity c ON c.id = t.courseId
    """)
    Page<ISearchGradeBookResponse> searchBy(Pageable pageable);

    @Query("""
        SELECT
            u.firstName as firstName,
            u.lastName as lastName,
            gd.score as score,
            gd.note as note,
            u.id as id
        FROM TimetableEntity t
            JOIN TimetableStudentEntity ts ON ts.timetableId = t.id
            JOIN UserEntity u ON u.id = ts.studentId
            LEFT JOIN TimetableGradeBookEntity g ON g.timetableId = t.id
            LEFT JOIN TimetableGradeBookDetailEntity gd ON gd.gradebookId = g.id AND gd.studentId = ts.studentId
        WHERE t.id = ?1
    """)
    List<IGetGradeBookDetailResponse> getStudentAndScore(Long timetableId);
}
