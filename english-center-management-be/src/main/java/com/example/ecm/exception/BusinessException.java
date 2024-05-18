package com.example.ecm.exception;

import com.example.ecm.constant.ErrorCode;
import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {

    private ErrorCode errorCode;

    public BusinessException(String msg) {
        super(msg);
    }

    public BusinessException(ErrorCode errorCode) {
        this(errorCode.getCode() + " - " + errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
