package com.example.ecm.model;

import java.util.HashMap;

public class ApiBody extends HashMap<String, Object> {

    public void setData(Object object) {
        this.put("data", object);
    }

    public <T> T getData(Class<T> type) {
        return (T) this.get("data");
    }

    public static ApiBody of(Object data) {
        ApiBody apiBody = new ApiBody();
        apiBody.setData(data);
        return apiBody;
    }
}
