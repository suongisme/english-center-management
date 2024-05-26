package com.example.ecm.module.question;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.question.request.CreateQuestionRequest;
import com.example.ecm.module.question.request.SearchQuestionRequest;
import com.example.ecm.module.question.request.UpdateQuestionRequest;
import com.example.ecm.module.question.response.ISearchQuestionResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final IQuestionService questionService;

    @GetMapping
    public ApiResponse findById(@RequestParam Long questionId) {
        final ApiBody apiBody = this.questionService.findById(questionId);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping("/search")
    public ApiResponse searchQuestion(@RequestBody @Valid SearchRequest<SearchQuestionRequest> request) {
        final ApiBody apiBody = this.questionService.searchQuestion(request);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse createQuestion(@RequestBody @Valid CreateQuestionRequest request) {
        this.questionService.createQuestion(request);
        return ApiResponse.ok();
    }

    @PutMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse updateQuestion(@RequestBody @Valid UpdateQuestionRequest request) {
        this.questionService.updateQuestion(request);
        return ApiResponse.ok();
    }

    @GetMapping("/testing")
    public ApiResponse getQuestionByTestingId(@RequestParam Long testingId) {
        final ApiBody apiBody = this.questionService.getQuestionAndAnswerByTestingId(testingId);
        return ApiResponse.ok(apiBody);
    }
}
