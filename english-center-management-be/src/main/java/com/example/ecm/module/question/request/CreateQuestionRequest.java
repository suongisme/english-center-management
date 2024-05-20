package com.example.ecm.module.question.request;

import com.example.ecm.module.question.QuestionEntity;
import com.example.ecm.module.question.answer.request.CreateAnswerRequest;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class CreateQuestionRequest {

    @NotBlank
    private String title;

    @NotNull
    private Integer status;

    private Long answerId;

    private Integer level;

    @NotNull
    @Min(1)
    private Integer score;

    @Size(min = 1)
    private List<CreateAnswerRequest> answers;

    public QuestionEntity toEntity() {
        QuestionEntity question = new QuestionEntity();
        question.setTitle(this.getTitle());
        question.setStatus(this.getStatus());
        question.setLevel(this.getLevel());
        question.setScore(this.getScore());
        return question;
    }
}
