package com.example.ecm.module.testing.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class UpdateTestingRequest extends CreateTestingRequest {

    @NotNull
    private Long id;
}
