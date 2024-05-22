package com.example.ecm.module.resource;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.resource.request.SearchResourceRequest;
import com.example.ecm.module.resource.request.CreateResourceRequest;

public interface IResourceService {

    ApiBody searchResource(SearchRequest<SearchResourceRequest> searchRequest);

    void createResource(CreateResourceRequest createResourceRequest) throws Exception;

    void deleteResource(Long id);
}
