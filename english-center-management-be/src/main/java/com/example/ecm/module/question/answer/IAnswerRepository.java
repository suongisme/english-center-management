package com.example.ecm.module.question.answer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface IAnswerRepository extends JpaRepository<AnswerEntity, Long> {

    @Modifying
    void deleteByQuestionId(Long questionId);

    List<AnswerEntity> findByQuestionId(long questionId);
}
