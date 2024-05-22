package com.example.ecm.module.resource;

import com.example.ecm.module.resource.request.SearchResourceRequest;
import com.example.ecm.module.resource.response.ISearchResourceResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IResourceRepository extends JpaRepository<ResourceEntity, Long> {

    @Query("""
        SELECT
            r.id as id,
            r.keyId as keyId,
            r.type as type,
            r.createdDate as createdDate,
            r.createdBy as createdBy,
            r.url as url,
            r.fileName as fileName
        FROM ResourceEntity r
        WHERE (:#{#data.type} IS NULL OR :#{#data.type} = r.type)
            AND (:#{#data.keyId} IS NULL OR :#{#data.keyId} = r.keyId)
    """)
    Page<ISearchResourceResponse> searchBy(
            @Param("data") SearchResourceRequest request,
            Pageable pageable
    );
}
