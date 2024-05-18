package com.example.ecm.module.student;

import com.example.ecm.module.student.request.SearchStudentRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IStudentRepository extends JpaRepository<StudentEntity, Long> {

    @Query(value = "SELECT s FROM StudentEntity s" +
            " WHERE :#{#data.status} is null OR :#{#data.status} = s.status" +
            "  AND (:#{#data.fullName} IS NULL OR s.firstName LIKE concat('%', :#{#data.fullName}, '%'))" +
            "  AND (:#{#data.fullName} IS NULL OR s.lastName LIKE concat('%', :#{#data.fullName}, '%'))")
    Page<StudentEntity> searchBy(@Param("data") SearchStudentRequest searchStudentRequest, Pageable pageable);
}
