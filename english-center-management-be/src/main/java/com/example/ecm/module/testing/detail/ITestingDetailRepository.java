package com.example.ecm.module.testing.detail;

import com.example.ecm.module.testing.detail.response.IGetTestingDetailResponse;
import com.example.ecm.module.testing.response.GetTestingResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ITestingDetailRepository extends JpaRepository<TestingDetailEntity, Long> {

    @Modifying
    @Query("DELETE FROM TestingDetailEntity t WHERE t.testingId = ?1")
    void deleteByTestingId(long testingId);

    @Query("""
        SELECT
            td.id as id,
            q.title as questionTitle,
            a.title as answer
        FROM TestingDetailEntity td
            JOIN QuestionEntity q ON td.questionId = q.id
            JOIN AnswerEntity a ON a.questionId = td.questionId AND a.correct = true
        WHERE td.testingId = ?1
    """)
    List<IGetTestingDetailResponse> getByTestingId(Long testingId);
}
