package com.example.ecm.module.testing;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.testing.request.CheckAnswerRequest;
import com.example.ecm.module.testing.request.CreateTestingRequest;
import com.example.ecm.module.testing.request.SearchTestingRequest;
import com.example.ecm.module.testing.request.UpdateTestingRequest;

import java.util.List;

public interface ITestingService {

    ApiBody getById(Long testingId);

    ApiBody searchTesting(SearchRequest<SearchTestingRequest> searchRequest);

    void createTesting(CreateTestingRequest createTestingRequest);

    void updateTesting(UpdateTestingRequest updateTestingRequest);

    ApiBody checkAnswer(Long testingId, List<CheckAnswerRequest> request);
}
