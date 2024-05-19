package com.example.ecm.module.user;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.module.user.request.CreateUserRequest;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.user.request.SearchUserRequest;
import com.example.ecm.module.user.request.UpdateUserRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final IUserService studentService;

    @PostMapping("/search")
    public ApiResponse searchUser(@RequestBody @Valid SearchRequest<SearchUserRequest> searchStudentRequestSearchRequest) {
        ApiBody apiBody = this.studentService.searchStudent(searchStudentRequestSearchRequest);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping
    public ApiResponse createUser(@RequestBody @Valid CreateUserRequest createStudentRequest) {
        this.studentService.createStudent(createStudentRequest);
        return ApiResponse.ok();
    }

    @PutMapping
    public ApiResponse updateUser(@RequestBody @Valid UpdateUserRequest updateStudentRequest) {
        this.studentService.updateStudent(updateStudentRequest);
        return ApiResponse.ok();
    }
}
