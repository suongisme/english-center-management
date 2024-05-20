package com.example.ecm.module.class_room;

import com.example.ecm.module.class_room.request.SearchClassRoomRequest;
import com.example.ecm.module.class_room.response.ISearchClassRoomResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IClassRoomRepository extends JpaRepository<ClassRoomEntity, Long> {

    @Query("""
        SELECT c FROM ClassRoomEntity c
        WHERE (:#{#data.name} IS NULL OR c.name LIKE CONCAT('%', :#{#data.name}, '%'))
            AND (:#{#data.status} IS NULL OR c.status = :#{#data.status})
            AND (:#{#data.position} IS NULL OR c.position = :#{#data.position})
    """)
    Page<ISearchClassRoomResponse> searchBy(
            @Param("data") SearchClassRoomRequest searchClassRoomRequest,
            Pageable pageable
    );
}
