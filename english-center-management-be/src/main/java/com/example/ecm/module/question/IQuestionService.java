package com.example.ecm.module.question;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.question.request.CreateQuestionRequest;
import com.example.ecm.module.question.request.SearchQuestionRequest;
import com.example.ecm.module.question.request.UpdateQuestionRequest;

public interface IQuestionService {

    ApiBody findById(Long questionId);

    ApiBody searchQuestion(SearchRequest<SearchQuestionRequest> request);

    void createQuestion(CreateQuestionRequest createQuestionRequest);

    void updateQuestion(UpdateQuestionRequest updateQuestionRequest);
}
