package com.example.ecm.module.resource;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.resource.request.CreateResourceRequest;
import com.example.ecm.module.resource.request.SearchResourceRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/resources")
public class ResourceController {

    private final IResourceService resourceService;

    @PostMapping("/search")
    public ApiResponse searchResource(@RequestBody @Valid SearchRequest<SearchResourceRequest> searchRequest) {
        final ApiBody apiBody = this.resourceService.searchResource(searchRequest);
        return ApiResponse.ok(apiBody);
    }

    @PostMapping
    public ApiResponse createResource(@Valid CreateResourceRequest createResourceRequest) throws Exception {
        this.resourceService.createResource(createResourceRequest);
        return ApiResponse.ok();
    }

    @DeleteMapping
    public ApiResponse deleteResource(@RequestParam Long id) {
        this.resourceService.deleteResource(id);
        return ApiResponse.ok();
    }
}
