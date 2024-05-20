package com.example.ecm.module.question.impl;

import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.model.SearchResponse;
import com.example.ecm.module.question.IQuestionRepository;
import com.example.ecm.module.question.IQuestionService;
import com.example.ecm.module.question.QuestionEntity;
import com.example.ecm.module.question.answer.IAnswerService;
import com.example.ecm.module.question.answer.response.AnswerResponse;
import com.example.ecm.module.question.request.CreateQuestionRequest;
import com.example.ecm.module.question.request.SearchQuestionRequest;
import com.example.ecm.module.question.request.UpdateQuestionRequest;
import com.example.ecm.module.question.response.GetQuestionResponse;
import com.example.ecm.module.question.response.ISearchQuestionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements IQuestionService {

    private final IQuestionRepository questionRepository;

    private final IAnswerService answerService;

    @Override
    public ApiBody findById(Long questionId) {
        return this.questionRepository.findById(questionId)
                .map(questionEntity -> {
                    List<AnswerResponse> answers = this.answerService.getByQuestionId(questionEntity.getId());
                    final GetQuestionResponse response = GetQuestionResponse.from(questionEntity);
                    response.setAnswers(answers);
                    return response;
                })
                .map(ApiBody::of)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
    }

    @Override
    public ApiBody searchQuestion(SearchRequest<SearchQuestionRequest> request) {
        Pageable pageable = Pageable.unpaged();
        if (request.isPaged()) {
            pageable = PageRequest.of(request.getPageNo() - 1, request.getPageSize(), Sort.Direction.DESC, "createdDate");
        }
        final SearchQuestionRequest data = Optional.ofNullable(request.getData()).orElseGet(SearchQuestionRequest::new);
        final Page<ISearchQuestionResponse> page = this.questionRepository.searchBy(data, pageable);
        final SearchResponse<ISearchQuestionResponse> response = SearchResponse.of(page);
        return ApiBody.of(response);
    }

    @Override
    @Transactional
    public void createQuestion(CreateQuestionRequest createQuestionRequest) {
        final QuestionEntity entity = createQuestionRequest.toEntity();
        this.questionRepository.save(entity);
        this.answerService.saveBatchAnswer(entity.getId(), createQuestionRequest.getAnswers());
    }

    @Override
    @Transactional
    public void updateQuestion(UpdateQuestionRequest updateQuestionRequest) {
        final QuestionEntity question = this.questionRepository.findById(updateQuestionRequest.getId())
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
        this.answerService.deleteByQuestion(question.getId());
        final QuestionEntity entity = updateQuestionRequest.toEntity();
        entity.setId(question.getId());
        this.questionRepository.save(entity);
        this.answerService.saveBatchAnswer(question.getId(), updateQuestionRequest.getAnswers());
    }
}
