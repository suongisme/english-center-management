package com.example.ecm.module.testing.detail.impl;

import com.example.ecm.model.SaveBatch;
import com.example.ecm.module.question.IQuestionService;
import com.example.ecm.module.testing.detail.ITestingDetailRepository;
import com.example.ecm.module.testing.detail.ITestingDetailService;
import com.example.ecm.module.testing.detail.response.IGetTestingDetailResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestingDetailImpl implements ITestingDetailService {

    private final ITestingDetailRepository testingDetailRepository;
    private final JdbcTemplate jdbcTemplate;

    private final IQuestionService questionService;

    @Override
    @Transactional
    public void saveBatchTestingDetail(Long testingId, List<Long> questionIds) {
        this.questionService.checkActiveQuestion(questionIds);
        SaveBatch<Long> saveBatch = new SaveBatch<>(questionIds, (ps, questionId) -> {
            ps.setLong(1, questionId);
            ps.setLong(2, testingId);
        });
        this.jdbcTemplate.batchUpdate("INSERT INTO TB_TESTING_DETAIL(QUESTION_ID, TESTING_ID) VALUES(?, ?)", saveBatch);
    }

    @Override
    @Transactional
    public void deleteByTestingId(Long testingId) {
        this.testingDetailRepository.deleteByTestingId(testingId);
    }
}
