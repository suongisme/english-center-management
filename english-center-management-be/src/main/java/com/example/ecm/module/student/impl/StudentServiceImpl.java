package com.example.ecm.module.student.impl;

import com.example.ecm.module.student.request.CreateStudentRequest;
import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.student.IStudentRepository;
import com.example.ecm.module.student.IStudentService;
import com.example.ecm.module.student.StudentEntity;
import com.example.ecm.module.student.request.SearchStudentRequest;
import com.example.ecm.module.student.request.UpdateStudentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements IStudentService {

    private final IStudentRepository studentRepository;

    @Override
    public ApiBody searchStudent(SearchRequest<SearchStudentRequest> searchStudentRequest) {
        final PageRequest pageable = PageRequest.of(searchStudentRequest.getPageNo(), searchStudentRequest.getPageSize(), Sort.Direction.DESC, "createdDate");
        final SearchStudentRequest data = searchStudentRequest.getData();
        final Page<StudentEntity> page = this.studentRepository.searchBy(data, pageable);
        return ApiBody.of(page);
    }

    @Override
    public void createStudent(CreateStudentRequest createStudentRequest) {
        final StudentEntity student = createStudentRequest.toEntity();
        this.studentRepository.save(student);
    }

    @Override
    public void updateStudent(UpdateStudentRequest updateStudentRequest) {
        StudentEntity student = this.studentRepository.findById(updateStudentRequest.getId())
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
        final StudentEntity requestEntity = updateStudentRequest.toEntity();
        requestEntity.setId(student.getId());
        this.studentRepository.save(requestEntity);
    }
}
