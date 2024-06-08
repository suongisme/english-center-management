package com.example.ecm.module.user;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.module.user.request.*;
import com.example.ecm.model.SearchRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    @PostMapping("/search")
    public ApiResponse searchUser(@RequestBody @Valid SearchRequest<SearchUserRequest> searchStudentRequestSearchRequest) {
        ApiBody apiBody = this.userService.searchUser(searchStudentRequestSearchRequest);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    public ApiResponse createUser(@RequestBody @Valid CreateUserRequest createStudentRequest) {
        this.userService.createUser(createStudentRequest);
        return ApiResponse.ok();
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    public ApiResponse updateUser(@RequestBody @Valid UpdateUserRequest updateStudentRequest) {
        this.userService.updateUser(updateStudentRequest);
        return ApiResponse.ok();
    }

    @GetMapping("/checkin")
    public ApiResponse getStudentInCheckin(@RequestParam Long checkinId) {
        final ApiBody apiBody = this.userService.getByCheckinId(checkinId);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping("/change-password")
    public ApiResponse changePassword(@RequestBody @Valid ChangePasswordRequest request) {
        this.userService.changePassword(request);
        return ApiResponse.ok();
    }

    @PutMapping("/update-info")
    public ApiResponse updateInfo(@RequestBody @Valid UpdateUserInfoRequest request) {
        this.userService.updateUserInfo(request);
        return ApiResponse.ok();
    }

    @GetMapping("/paid-student")
    public ApiResponse getPaidStudent(@RequestParam Long courseId) {
        ApiBody apiBody = this.userService.getPaidStudent(courseId);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping("/statistic-user")
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    public ApiResponse statisticUser(@RequestBody @Valid SearchRequest<GetStatisticUserRequest> searchRequest) {
        ApiBody apiBody = this.userService.statisticUser(searchRequest);
        return ApiResponse.ok(apiBody);
    }

}
