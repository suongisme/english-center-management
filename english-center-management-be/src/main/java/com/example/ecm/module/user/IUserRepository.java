package com.example.ecm.module.user;

import com.example.ecm.module.user.request.SearchUserRequest;
import com.example.ecm.module.user.response.ISearchUserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IUserRepository extends JpaRepository<UserEntity, Long> {

    @Query("""
        SELECT s FROM UserEntity s
        WHERE (:#{#data.status} IS NULL OR :#{#data.status} = s.status)
            AND (:#{#data.fullName} IS NULL OR s.firstName LIKE concat('%', :#{#data.fullName}, '%') OR s.lastName LIKE concat('%', :#{#data.fullName}, '%'))
            AND (:#{#data.role} IS NULL OR :#{#data.role} = s.role)
    """)
    Page<ISearchUserResponse> searchBy(@Param("data") SearchUserRequest searchStudentRequest, Pageable pageable);
}
