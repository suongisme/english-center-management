package com.example.ecm.model;

import lombok.*;

import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class SearchRequest<T> {
    private T data;

    private Integer pageNo;

    private Integer pageSize;

    public boolean isPaged() {
        return Objects.nonNull(this.pageNo) && Objects.nonNull(this.pageSize);
    }
}
