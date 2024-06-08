package com.example.ecm.module.course;

import com.example.ecm.module.course.request.GetDetailCourseRequest;
import com.example.ecm.module.course.request.GetStatisticalCourseRequest;
import com.example.ecm.module.course.request.SearchCourserRequest;
import com.example.ecm.module.course.response.IGetDetailCourseResponse;
import com.example.ecm.module.course.response.ISearchCourseResponse;
import com.example.ecm.module.course.response.IStatisticalCourseResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

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

    @Query("SELECT c FROM CourseEntity c WHERE c.id = :#{#data.id} AND (:#{#data.status} IS NULL OR :#{#data.status} = c.status)")
    Optional<IGetDetailCourseResponse> getDetailById(@Param("data") GetDetailCourseRequest request);

    @Query("""
        SELECT
            c.id as id,
            c.name as name,
            SUM(case when tb.status = 1 THEN 1 ELSE 0 END) as totalActiveTimetable,
            SUM(case when tb.status = 0 THEN 1 ELSE 0 END) as totalFinishTimetable
        FROM CourseEntity c
            LEFT JOIN TimetableEntity tb ON tb.courseId = c.id
        WHERE (:#{#data.name} IS NULL OR c.name LIKE CONCAT('%', :#{#data.name}, '%'))
        GROUP BY c.id
    """)
    Page<IStatisticalCourseResponse> statisticalCourse(GetStatisticalCourseRequest data, Pageable pageable);
}
