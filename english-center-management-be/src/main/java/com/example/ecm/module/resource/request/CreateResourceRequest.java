package com.example.ecm.module.resource.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreateResourceRequest {

    @NotNull
    private Long keyId;

    @NotBlank
    private String type;

    @NotNull
    private MultipartFile file;
}
