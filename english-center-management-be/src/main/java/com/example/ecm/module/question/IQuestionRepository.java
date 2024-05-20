package com.example.ecm.module.question;

import com.example.ecm.module.question.request.SearchQuestionRequest;
import com.example.ecm.module.question.response.ISearchQuestionResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IQuestionRepository extends JpaRepository<QuestionEntity, Long> {

    @Query("""
        SELECT q as question, a.id as answerid, a.title as answerTitle FROM QuestionEntity q
            LEFT JOIN AnswerEntity a ON a.questionId = q.id AND a.correct = true
        WHERE (:#{#data.status} IS NULL OR q.status = :#{#data.status})
            AND (:#{#data.level} IS NULL OR q.level = :#{#data.level})
            AND (:#{#data.title} IS NULL OR q.title LIKE CONCAT('%', :#{#data.title}, '%'))
    """)
    Page<ISearchQuestionResponse> searchBy(
            @Param("data") SearchQuestionRequest questionRequest,
            Pageable pageable
    );
}
