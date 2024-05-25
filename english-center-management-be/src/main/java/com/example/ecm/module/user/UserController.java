package com.example.ecm.module.user;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.module.user.request.ChangePasswordRequest;
import com.example.ecm.module.user.request.CreateUserRequest;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.user.request.SearchUserRequest;
import com.example.ecm.module.user.request.UpdateUserRequest;
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
}
