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

    private final IUserService userService;

    @PostMapping("/search")
    public ApiResponse searchUser(@RequestBody @Valid SearchRequest<SearchUserRequest> searchStudentRequestSearchRequest) {
        ApiBody apiBody = this.userService.searchUser(searchStudentRequestSearchRequest);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping
    public ApiResponse createUser(@RequestBody @Valid CreateUserRequest createStudentRequest) {
        this.userService.createUser(createStudentRequest);
        return ApiResponse.ok();
    }

    @PutMapping
    public ApiResponse updateUser(@RequestBody @Valid UpdateUserRequest updateStudentRequest) {
        this.userService.updateUser(updateStudentRequest);
        return ApiResponse.ok();
    }

    @GetMapping("/timetable")
    public ApiResponse getStudentInTimetable(@RequestParam Long timetableId) {
        final ApiBody apiBody = this.userService.getByTimetableId(timetableId);
        return ApiResponse.ok(apiBody);
    }

    @GetMapping("/checkin")
    public ApiResponse getStudentInCheckin(@RequestParam Long checkinId) {
        final ApiBody apiBody = this.userService.getByCheckinId(checkinId);
        return ApiResponse.ok(apiBody);
    }
}
