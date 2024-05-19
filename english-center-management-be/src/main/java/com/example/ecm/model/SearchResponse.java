package com.example.ecm.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.datasource.init.UncategorizedScriptException;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchResponse<T> {
    private List<T> items;
    private long totalItems;
    private long totalPage;
    private long page;
    private long pageSize;

    public static <T> SearchResponse<T> of(Page<T> page) {
        final Pageable pageable = page.getPageable();
        final SearchResponse<T> response = new SearchResponse<>();
        response.setItems(page.getContent());
        response.setTotalItems(page.getTotalElements());
        response.setTotalPage(page.getTotalPages());
        if (pageable.isPaged()) {
            response.setPageSize(pageable.getPageSize());
            response.setPage(pageable.getPageNumber() + 1);
        }
        return response;
    }
}
