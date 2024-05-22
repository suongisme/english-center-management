package com.example.ecm.model;

import com.example.ecm.constant.AppConstant;
import com.example.ecm.constant.ErrorCode;
import com.example.ecm.constant.ApiStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.MDC;

@NoArgsConstructor
@Getter
@Setter
public class ApiResponse {
    private ApiBody apiBody;
    private ApiError apiError;
    private ErrorCode code;
    private ApiStatus status;
    private String traceId;
    private long duration;

    public static ApiResponse ok(ApiBody apiBody) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setStatus(ApiStatus.SUCCESS);
        apiResponse.setCode(ErrorCode.SUCCESS);
        apiResponse.setApiBody(apiBody);
        return apiResponse;
    }

    public static ApiResponse ok() {
        return ok(null);
    }

    public static ApiResponse fail(ErrorCode code, ApiError apiError) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setStatus(ApiStatus.FAIL);
        apiResponse.setCode(code);
        apiResponse.setApiError(apiError);
        return apiResponse;
    }

    public static ApiResponse fail(ErrorCode code, String message) {
        ApiError apiError = new ApiError(message, null);
        return ApiResponse.fail(code, apiError);
    }

    public static ApiResponse fail(ErrorCode code) {
        ApiError apiError = new ApiError(code.getMessage(), null);
        return ApiResponse.fail(code, apiError);
    }

    public String getTraceId() {
        return MDC.get(AppConstant.TRACE_ID_KEY);
    }

    public long getDuration() {
        final long endTime = System.currentTimeMillis();
        final String startTime = MDC.get(AppConstant.START_TIME);
        final long startTimeNum = NumberUtils.toLong(startTime, endTime);
        return endTime - startTimeNum;
    }
}

