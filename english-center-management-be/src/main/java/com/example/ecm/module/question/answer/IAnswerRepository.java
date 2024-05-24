package com.example.ecm.module.question.answer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IAnswerRepository extends JpaRepository<AnswerEntity, Long> {

    @Modifying
    @Query("DELETE FROM AnswerEntity a WHERE a.questionId = ?1")
    void deleteByQuestionId(Long questionId);

    List<AnswerEntity> findByQuestionId(long questionId);
}
