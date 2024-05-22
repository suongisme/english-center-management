package com.example.ecm.module.resource.impl;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.model.SearchResponse;
import com.example.ecm.module.resource.*;
import com.example.ecm.module.resource.provider.IResourceProvider;
import com.example.ecm.module.resource.request.CreateResourceRequest;
import com.example.ecm.module.resource.request.SearchResourceRequest;
import com.example.ecm.module.resource.response.ISearchResourceResponse;
import com.example.ecm.module.resource.validator.IResourceValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResourceServiceImpl implements IResourceService {

    @Value("${resource.provider}")
    private String provider;

    private final ApplicationContext applicationContext;
    private final IResourceProvider resourceProvider;
    private final IResourceRepository resourceRepository;

    @Override
    public ApiBody searchResource(SearchRequest<SearchResourceRequest> searchRequest) {
        Pageable pageable = Pageable.unpaged();
        if (searchRequest.isPaged()) {
            pageable = PageRequest.of(searchRequest.getPageNo() - 1, searchRequest.getPageSize());
        }
        final SearchResourceRequest data = Optional.ofNullable(searchRequest.getData()).orElseGet(SearchResourceRequest::new);
        final Page<ISearchResourceResponse> page = this.resourceRepository.searchBy(data, pageable);
        final SearchResponse<ISearchResourceResponse> response = SearchResponse.of(page);
        return ApiBody.of(response);
    }

    @Override
    public void createResource(CreateResourceRequest createResourceRequest) throws Exception {
        final IResourceValidator validator = this.applicationContext.getBean(createResourceRequest.getType(), IResourceValidator.class);
        validator.validate(createResourceRequest.getKeyId());
        final String url = this.resourceProvider.saveFile(createResourceRequest.getFile(), String.format("/%s/%s", createResourceRequest.getType(), createResourceRequest.getKeyId()));
        ResourceEntity resourceEntity = new ResourceEntity();
        resourceEntity.setUrl(url);
        resourceEntity.setKeyId(createResourceRequest.getKeyId());
        resourceEntity.setType(createResourceRequest.getType());
        resourceEntity.setProvider(this.provider);
        resourceEntity.setFileName(createResourceRequest.getFile().getOriginalFilename());
        this.resourceRepository.save(resourceEntity);
    }

    @Override
    public void deleteResource(Long id) {
        this.resourceRepository.deleteById(id);
    }
}
