package com.example.ecm.module.testing;

import com.example.ecm.module.testing.request.SearchTestingRequest;
import com.example.ecm.module.testing.response.ISearchTestingResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ITestingRepository extends JpaRepository<TestingEntity, Long> {

    @Query("""
        SELECT
            t as testing,
            c.name as courseName,
            count(q) as questionSize
        FROM TestingEntity t
            JOIN CourseEntity c ON t.courseId = c.id
            JOIN TestingDetailEntity td ON td.testingId = t.id
            JOIN QuestionEntity q ON q.id = td.questionId AND q.status = 1
        WHERE (:#{#data.status} IS NULL OR :#{#data.status} = t.status)
            AND (:#{#data.courseId} IS NULL OR :#{#data.courseId} = t.courseId)
            AND (:#{#data.name} IS NULL OR t.name LIKE CONCAT('%', :#{#data.name}, '%'))
        GROUP BY t.id
    """)
    Page<ISearchTestingResponse> searchBy(
            @Param("data") SearchTestingRequest searchTestingRequest,
            Pageable pageable
    );
}
