package com.example.ecm.module.user;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.user.request.CreateUserRequest;
import com.example.ecm.module.user.request.SearchUserRequest;
import com.example.ecm.module.user.request.UpdateUserRequest;

public interface IUserService {

    void createUser(CreateUserRequest createStudentRequest);

    void updateUser(UpdateUserRequest updateStudentRequest);

    ApiBody searchUser(SearchRequest<SearchUserRequest> searchStudentRequest);

    UserEntity findByIdThrowIfNotPresent(Long id);

    ApiBody getByCheckinId(Long checkinId);
}
