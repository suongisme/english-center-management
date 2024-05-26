package com.example.ecm.module.question.answer;

import com.example.ecm.module.question.answer.request.CreateAnswerRequest;
import com.example.ecm.module.question.answer.response.AnswerResponse;

import java.util.List;

public interface IAnswerService {

    void saveBatchAnswer(Long questionId, List<CreateAnswerRequest> answerRequests);

    void deleteByQuestion(Long questionId);

    List<AnswerResponse> getByQuestionId(Long questionId, boolean showCorrectAnswer);

    default List<AnswerResponse> getByQuestionId(Long questionId) {
        return this.getByQuestionId(questionId, true);
    }
}
