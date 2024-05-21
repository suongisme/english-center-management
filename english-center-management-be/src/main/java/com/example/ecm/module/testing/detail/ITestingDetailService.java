package com.example.ecm.module.testing.detail;

import java.util.List;

public interface ITestingDetailService {

    void saveBatchTestingDetail(Long testingId, List<Long> questionIds);

    void deleteByTestingId(Long testingId);

}
