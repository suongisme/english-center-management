package com.example.ecm.module.course;

import com.example.ecm.module.course.request.SearchCourserRequest;
import com.example.ecm.module.course.response.ISearchCourseResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ICourseRepository extends JpaRepository<CourseEntity, Long> {

    @Query("""
        SELECT c FROM CourseEntity c
        WHERE (:#{#data.name} IS NULL OR c.name LIKE CONCAT('%', :#{#data.name}, '%'))
            AND (:#{#data.fromPrice} IS NULL OR c.price >= :#{#data.fromPrice})
            AND (:#{#data.toPrice} IS NULL OR c.price <= :#{#data.toPrice})
            AND (:#{#data.status} IS NULL OR c.status = :#{#data.status})
    """)
    Page<ISearchCourseResponse> searchBy(
            @Param("data") SearchCourserRequest searchCourserRequest,
            Pageable pageable
    );
}
