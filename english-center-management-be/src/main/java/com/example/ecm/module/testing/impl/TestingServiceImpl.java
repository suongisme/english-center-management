package com.example.ecm.module.testing.impl;

import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.model.SearchResponse;
import com.example.ecm.module.question.IQuestionService;
import com.example.ecm.module.question.response.ISearchQuestionResponse;
import com.example.ecm.module.testing.ITestingRepository;
import com.example.ecm.module.testing.ITestingService;
import com.example.ecm.module.testing.TestingEntity;
import com.example.ecm.module.testing.detail.ITestingDetailService;
import com.example.ecm.module.testing.request.CheckAnswerRequest;
import com.example.ecm.module.testing.request.CreateTestingRequest;
import com.example.ecm.module.testing.request.SearchTestingRequest;
import com.example.ecm.module.testing.request.UpdateTestingRequest;
import com.example.ecm.module.testing.response.CheckAnswerResponse;
import com.example.ecm.module.testing.response.GetTestingResponse;
import com.example.ecm.module.testing.response.ISearchTestingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TestingServiceImpl implements ITestingService {

    private final ITestingRepository testingRepository;

    private final ITestingDetailService testingDetailService;

    private final IQuestionService questionService;

    @Override
    public ApiBody getById(Long testingId) {
        return this.testingRepository.findById(testingId)
                .map(entity -> {
                    GetTestingResponse response = new GetTestingResponse(entity);
                    final List<ISearchQuestionResponse> details = this.questionService.getByTestingId(entity.getId());
                    response.setQuestions(details);
                    return response;
                })
                .map(ApiBody::of)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
    }

    @Override
    public ApiBody searchTesting(SearchRequest<SearchTestingRequest> searchRequest) {
        Pageable pageable = Pageable.unpaged();
        if (searchRequest.isPaged()) {
            pageable = PageRequest.of(searchRequest.getPageNo() - 1, searchRequest.getPageSize(), Sort.Direction.DESC, "createdDate");
        }
        final SearchTestingRequest data = Optional.ofNullable(searchRequest.getData()).orElseGet(SearchTestingRequest::new);
        final Page<ISearchTestingResponse> page = this.testingRepository.searchBy(data, pageable);
        final SearchResponse<ISearchTestingResponse> response = SearchResponse.of(page);
        return ApiBody.of(response);
    }

    @Override
    @Transactional
    public void createTesting(CreateTestingRequest createTestingRequest) {
        final TestingEntity entity = createTestingRequest.toEntity();
        this.testingRepository.save(entity);
        this.testingDetailService.saveBatchTestingDetail(entity.getId(), createTestingRequest.getQuestionIds());
    }

    @Override
    @Transactional
    public void updateTesting(UpdateTestingRequest updateTestingRequest) {
        final TestingEntity testing = this.testingRepository.findById(updateTestingRequest.getId())
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
        this.testingDetailService.deleteByTestingId(testing.getId());
        this.createTesting(updateTestingRequest);
    }

    @Override
    public ApiBody checkAnswer(Long testingId, List<CheckAnswerRequest> request) {
        final TestingEntity testing = this.testingRepository.findById(testingId)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
        final List<ISearchQuestionResponse> questions = this.questionService.getByTestingId(testingId);
        final Map<Long, ISearchQuestionResponse> questionMap = questions.stream()
                .collect(Collectors.toMap(ISearchQuestionResponse::getId, Function.identity()));
        CheckAnswerResponse checkAnswerResponse = new CheckAnswerResponse();
        checkAnswerResponse.setQuestions(questions);
        checkAnswerResponse.setMinimumScore(testing.getMinimumScore());
        request.forEach(x -> {
            final ISearchQuestionResponse question = questionMap.get(x.getQuestionId());
            if (question.getAnswerId().equals(x.getAnswerId())) {
                checkAnswerResponse.incrementCorrect();
                checkAnswerResponse.plusScore(question.getScore());
            } else {
                checkAnswerResponse.incrementIncorrect();

            }
            checkAnswerResponse.plusTotalScore(question.getScore());
        });
        return ApiBody.of(checkAnswerResponse);
    }
}
