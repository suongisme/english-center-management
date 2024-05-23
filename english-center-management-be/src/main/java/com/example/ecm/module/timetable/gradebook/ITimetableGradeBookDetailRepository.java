package com.example.ecm.module.timetable.gradebook;

import com.example.ecm.module.timetable.gradebook.response.IGetGradeBookDetailResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ITimetableGradeBookDetailRepository extends JpaRepository<TimetableGradeBookDetailEntity, Long> {

    @Query("""
        SELECT
            d.note as note,
            d.score as score,
            d.studentId as id,
            u.lastName as lastName,
            u.firstName as firstName
        FROM TimetableGradeBookDetailEntity d
            JOIN UserEntity u ON u.id = d.studentId
        WHERE d.gradebookId = ?1
    """)
    List<IGetGradeBookDetailResponse> findByGradeBookdId(Long gradeBookId);
}
