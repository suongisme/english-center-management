package com.example.ecm.module.user.impl;

import com.example.ecm.model.SearchResponse;
import com.example.ecm.module.user.request.CreateUserRequest;
import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.user.IUserRepository;
import com.example.ecm.module.user.IUserService;
import com.example.ecm.module.user.UserEntity;
import com.example.ecm.module.user.request.SearchUserRequest;
import com.example.ecm.module.user.request.UpdateUserRequest;
import com.example.ecm.module.user.response.ISearchUserResponse;
import com.example.ecm.module.user.response.IStudentTimetableResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final IUserRepository studentRepository;

    @Override
    public UserEntity findByIdThrowIfNotPresent(Long id) {
        return this.studentRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
    }

    @Override
    public ApiBody searchUser(SearchRequest<SearchUserRequest> searchStudentRequest) {
        Pageable pageable = Pageable.unpaged();
        if (searchStudentRequest.isPaged()) {
            pageable = PageRequest.of(searchStudentRequest.getPageNo() - 1, searchStudentRequest.getPageSize(), Sort.Direction.DESC, "createdDate");
        }
        final SearchUserRequest data = Optional.ofNullable(searchStudentRequest.getData()).orElseGet(SearchUserRequest::new);
        final Page<ISearchUserResponse> page = this.studentRepository.searchBy(data, pageable);
        final SearchResponse<ISearchUserResponse> response = SearchResponse.of(page);
        return ApiBody.of(response);
    }

    @Override
    public void createUser(CreateUserRequest createStudentRequest) {
        try {
            final UserEntity student = createStudentRequest.toEntity();
            this.studentRepository.save(student);
        } catch (DataIntegrityViolationException ex) {
            throw new BusinessException(ErrorCode.USERNAME_EXIST);
        }
    }

    @Override
    public void updateUser(UpdateUserRequest updateStudentRequest) {
        UserEntity user = this.studentRepository.findById(updateStudentRequest.getId())
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
        final UserEntity requestEntity = updateStudentRequest.toEntity();
        if (StringUtils.isBlank(updateStudentRequest.getPassword())) {
            requestEntity.setPassword(user.getPassword());
        }
        requestEntity.setId(user.getId());
        this.studentRepository.save(requestEntity);
    }

    @Override
    public ApiBody getByTimetableId(Long timetableId) {
        final List<IStudentTimetableResponse> response = this.studentRepository.getByTimetableId(timetableId);
        return ApiBody.of(response);
    }

    @Override
    public ApiBody getByCheckinId(Long checkinId) {
        final List<IStudentTimetableResponse> response = this.studentRepository.getByCheckinId(checkinId);
        return ApiBody.of(response);
    }
}
