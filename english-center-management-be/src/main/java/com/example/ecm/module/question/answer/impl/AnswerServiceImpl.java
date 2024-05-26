package com.example.ecm.module.question.answer.impl;

import com.example.ecm.module.question.answer.IAnswerRepository;
import com.example.ecm.module.question.answer.IAnswerService;
import com.example.ecm.module.question.answer.request.CreateAnswerRequest;
import com.example.ecm.module.question.answer.response.AnswerResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerServiceImpl implements IAnswerService {

    private final IAnswerRepository answerRepository;
    private final JdbcTemplate jdbcTemplate;

    @Override
    @Transactional
    public void saveBatchAnswer(Long questionId, List<CreateAnswerRequest> answerRequests) {
        BatchPreparedStatementSetter batchPreparedStatementSetter = new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                final CreateAnswerRequest createAnswerRequest = answerRequests.get(i);
                ps.setString(1, createAnswerRequest.getTitle());
                ps.setBoolean(2, Optional.ofNullable(createAnswerRequest.getCorrect()).orElse(Boolean.FALSE));
                ps.setLong(3, questionId);
            }

            @Override
            public int getBatchSize() {
                return answerRequests.size();
            }
        };
        this.jdbcTemplate.batchUpdate("INSERT INTO TB_ANSWER(TITLE, CORRECT, QUESTION_ID) VALUES(?, ?, ?)", batchPreparedStatementSetter);
    }

    @Override
    @Transactional
    public void deleteByQuestion(Long questionId) {
        this.answerRepository.deleteByQuestionId(questionId);
    }

    @Override
    public List<AnswerResponse> getByQuestionId(Long questionId, boolean showCorrectAnswer) {
        return this.answerRepository.findByQuestionId(questionId).stream()
                .map(AnswerResponse::from)
                .peek(x -> {
                    if (!showCorrectAnswer) {
                        x.setCorrect(null);
                    }
                })
                .toList();
    }
}
