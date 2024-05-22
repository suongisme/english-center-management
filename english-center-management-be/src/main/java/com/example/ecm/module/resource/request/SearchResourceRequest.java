package com.example.ecm.module.resource.request;

import lombok.Data;

@Data
public class SearchResourceRequest {
    private String type;
    private Long keyId;
}
