package com.example.ecm.module.student;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.student.request.CreateStudentRequest;
import com.example.ecm.module.student.request.SearchStudentRequest;
import com.example.ecm.module.student.request.UpdateStudentRequest;

public interface IStudentService {

    void createStudent(CreateStudentRequest createStudentRequest);

    void updateStudent(UpdateStudentRequest updateStudentRequest);

    ApiBody searchStudent(SearchRequest<SearchStudentRequest> searchStudentRequest);
}
