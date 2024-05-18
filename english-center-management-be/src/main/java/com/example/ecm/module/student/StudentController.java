package com.example.ecm.module.student;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.module.student.request.CreateStudentRequest;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.student.request.SearchStudentRequest;
import com.example.ecm.module.student.request.UpdateStudentRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {

    private final IStudentService studentService;

    @PostMapping("/search")
    public ApiResponse searchStudent(@RequestBody @Valid SearchRequest<SearchStudentRequest> searchStudentRequestSearchRequest) {
        ApiBody apiBody = this.studentService.searchStudent(searchStudentRequestSearchRequest);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping
    public ApiResponse createStudent(@RequestBody @Valid CreateStudentRequest createStudentRequest) {
        this.studentService.createStudent(createStudentRequest);
        return ApiResponse.ok();
    }

    @PutMapping
    public ApiResponse updateStudent(@RequestBody @Valid UpdateStudentRequest updateStudentRequest) {
        this.studentService.updateStudent(updateStudentRequest);
        return ApiResponse.ok();
    }
}
