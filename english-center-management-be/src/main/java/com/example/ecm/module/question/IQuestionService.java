package com.example.ecm.module.question;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.question.request.CreateQuestionRequest;
import com.example.ecm.module.question.request.SearchQuestionRequest;
import com.example.ecm.module.question.request.UpdateQuestionRequest;
import com.example.ecm.module.question.response.ISearchQuestionResponse;

import java.util.List;

public interface IQuestionService {

    ApiBody findById(Long questionId);

    ApiBody searchQuestion(SearchRequest<SearchQuestionRequest> request);

    void createQuestion(CreateQuestionRequest createQuestionRequest);

    void updateQuestion(UpdateQuestionRequest updateQuestionRequest);

    void checkActiveQuestion(List<Long> questionIds);

    List<ISearchQuestionResponse> getByTestingId(long testingId);

    ApiBody getQuestionAndAnswerByTestingId(long testingId);
}
