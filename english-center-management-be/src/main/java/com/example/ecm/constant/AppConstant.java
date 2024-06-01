package com.example.ecm.constant;

import org.apache.commons.lang3.math.NumberUtils;

import java.math.BigDecimal;

public class AppConstant {
    public static final String TRACE_ID_KEY = "traceId";
    public static final String START_TIME = "startTime";

    public static final int ACTIVE = 1;
    public static final int INACTIVE = 0;
    public static final BigDecimal ONE_HUNDRED = NumberUtils.createBigDecimal("100");
}
