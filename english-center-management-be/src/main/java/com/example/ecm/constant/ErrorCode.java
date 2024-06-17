package com.example.ecm.constant;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {
    SUCCESS("00", "Success"),
    VALIDATE_FAIL("01", "Đầu vào không hợp lệ"),
    NOT_FOUND_RECORD("02", "Không tìm thấy bản ghi tương ứng"),
    NOT_FOUND_TEACHER("03", "Giáo viên không tồn tại"),
    TIMETABLE_EXIST("04", "Lịch đã trùng lặp"),
    USERNAME_EXIST("05", "Tên đăng nhập đã tồn tại"),
    TIMETABLE_CHECKED_IN("06", "Lịch học đã được điểm danh, không được phép chỉnh sửa"),
    USER_DISABLED("95", "Tài khoản bị vô hiệu hóa, liên hệ với admin để được hỗ trợ."),
    METHOD_PAYMENT_NOT_SP("96", "Phương thức thanh toán được được nâng cấp"),
    USERNAME_PASSWORD_INCORRECT("97","Tài khoản hoặc mật khẩu không chính xác"),
    FORBIDDEN("98","Bạn không có quyền thực hiện"),
    INTERNAL_ERROR("99","Lỗi hệ thống"),
    UNKNOWN("", "Không xác định");

    private final String code;
    private final String message;
}
