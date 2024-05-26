package com.example.ecm.module.testing.response;

import com.example.ecm.module.question.response.ISearchQuestionResponse;
import lombok.Data;

import java.util.List;

@Data
public class CheckAnswerResponse {
    private int correctQuestion;
    private int incorrectQuestion;
    private int score;
    private int totalScore;
    private int minimumScore;
    private List<ISearchQuestionResponse> questions;

    public void incrementCorrect() {
        this.correctQuestion++;
    }

    public void incrementIncorrect() {
        this.incorrectQuestion++;
    }

    public void plusScore(int score) {
        this.score += score;
    }

    public void plusTotalScore(int score) {
        this.totalScore += score;
    }
}
