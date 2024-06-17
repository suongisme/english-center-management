package com.example.ecm.module.user.impl;

import com.example.ecm.model.SearchResponse;
import com.example.ecm.module.user.constant.RoleEnum;
import com.example.ecm.module.user.request.*;
import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.user.IUserRepository;
import com.example.ecm.module.user.IUserService;
import com.example.ecm.module.user.UserEntity;
import com.example.ecm.module.user.response.IGetStatisticUserResponse;
import com.example.ecm.module.user.response.ISearchUserResponse;
import com.example.ecm.module.user.response.IStudentTimetableResponse;
import com.example.ecm.utils.AuthenticationUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserEntity findByIdThrowIfNotPresent(Long id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
    }

    @Override
    public ApiBody searchUser(SearchRequest<SearchUserRequest> searchStudentRequest) {
        Pageable pageable = Pageable.unpaged();
        if (searchStudentRequest.isPaged()) {
            pageable = PageRequest.of(searchStudentRequest.getPageNo() - 1, searchStudentRequest.getPageSize(), Sort.Direction.DESC, "createdDate");
        }
        final SearchUserRequest data = Optional.ofNullable(searchStudentRequest.getData()).orElseGet(SearchUserRequest::new);
        final Page<ISearchUserResponse> page = this.userRepository.searchBy(data, pageable);
        final SearchResponse<ISearchUserResponse> response = SearchResponse.of(page);
        return ApiBody.of(response);
    }

    @Override
    public void createUser(CreateUserRequest createStudentRequest) {
        try {
            final UserEntity student = createStudentRequest.toEntity();
            student.setPassword(this.passwordEncoder.encode(student.getPassword()));
            this.userRepository.save(student);
        } catch (DataIntegrityViolationException ex) {
            throw new BusinessException(ErrorCode.USERNAME_EXIST);
        }
    }

    @Override
    public void updateUser(UpdateUserRequest updateStudentRequest) {
        UserEntity user = this.userRepository.findById(updateStudentRequest.getId())
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
        final UserEntity requestEntity = updateStudentRequest.toEntity();
        if (StringUtils.isNotBlank(updateStudentRequest.getPassword())) {
            requestEntity.setPassword(this.passwordEncoder.encode(updateStudentRequest.getPassword()));
        } else {
            requestEntity.setPassword(user.getPassword());
        }
        requestEntity.setId(user.getId());
        this.userRepository.save(requestEntity);
    }

    @Override
    public ApiBody getByCheckinId(Long checkinId) {
        final List<IStudentTimetableResponse> response = this.userRepository.getByCheckinId(checkinId);
        return ApiBody.of(response);
    }

    @Override
    public void changePassword(ChangePasswordRequest request) {
        final String username = AuthenticationUtil.getUsername();
        final UserEntity user = this.userRepository.findByUsername(username)
                .orElseThrow();
        final boolean isMatch = this.passwordEncoder.matches(request.getCurrentPassword(), user.getPassword());
        if (!isMatch) {
            throw new BusinessException(ErrorCode.VALIDATE_FAIL, "Mật khẩu không chính xác");
        }
        final String newPassword = this.passwordEncoder.encode(request.getNewPassword());
        user.setPassword(newPassword);
        this.userRepository.save(user);
    }

    @Override
    public void updateUserInfo(UpdateUserInfoRequest request) {
        final String username = AuthenticationUtil.getUsername();
        final UserEntity user = this.userRepository.findByUsername(username)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
        if (StringUtils.isNotBlank(request.getFirstName())) {
            user.setFirstName(request.getFirstName());
        }

        if (StringUtils.isNotBlank(request.getLastName())) {
            user.setLastName(request.getLastName());
        }

        if (StringUtils.isNotBlank(request.getPhone())) {
            user.setPhone(request.getPhone());
        }

        if (StringUtils.isNotBlank(request.getEmail())) {
            user.setEmail(request.getEmail());
        }

        if (StringUtils.isNotBlank(request.getAddress())) {
            user.setAddress(request.getAddress());
        }

        if (Objects.nonNull(request.getDob())) {
            user.setDob(request.getDob());
        }

        this.userRepository.save(user);
    }


    @Override
    public ApiBody getPaidStudent(Long courseId) {
        return ApiBody.of(this.userRepository.getPaidStudent(courseId));
    }

    @Override
    public ApiBody statisticUser(SearchRequest<GetStatisticUserRequest> searchRequest) {
        Pageable pageable = Pageable.unpaged();
        if (searchRequest.isPaged()) {
            pageable = PageRequest.of(searchRequest.getPageNo() - 1, searchRequest.getPageSize());
        }
        final GetStatisticUserRequest data = Optional.ofNullable(searchRequest.getData()).orElseGet(GetStatisticUserRequest::new);
        final Page<IGetStatisticUserResponse> page = this.userRepository.statisticStudent(data, pageable);
        final SearchResponse<IGetStatisticUserResponse> response = SearchResponse.of(page);
        return ApiBody.of(response);
    }
}
