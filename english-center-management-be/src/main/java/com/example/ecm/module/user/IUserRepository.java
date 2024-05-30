package com.example.ecm.module.user;

import com.example.ecm.module.user.request.SearchUserRequest;
import com.example.ecm.module.user.response.ISearchUserResponse;
import com.example.ecm.module.user.response.IStudentTimetableResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IUserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByUsername(String username);

    @Query("""
        SELECT s FROM UserEntity s
        WHERE (:#{#data.status} IS NULL OR :#{#data.status} = s.status)
            AND (:#{#data.fullName} IS NULL OR s.firstName LIKE concat('%', :#{#data.fullName}, '%') OR s.lastName LIKE concat('%', :#{#data.fullName}, '%'))
            AND (:#{#data.role} IS NULL OR :#{#data.role} = s.role)
    """)
    Page<ISearchUserResponse> searchBy(@Param("data") SearchUserRequest searchStudentRequest, Pageable pageable);

    @Query("""
        SELECT
            u.firstName as firstName,
            u.lastName as lastName,
            u.id as id,
            cks.absent as absent,
            cks.note as note
        FROM CheckinEntity ck
            JOIN CheckinStudentEntity cks ON cks.checkinId = ck.id
            JOIN UserEntity u ON cks.studentId = u.id
        WHERE ck.id = ?1
    """)
    List<IStudentTimetableResponse> getByCheckinId(Long checkin);

    @Query("""
        SELECT u.firstName as firstName, u.lastName as lastName, u.id as id
        FROM UserEntity u
            JOIN BillEntity b ON u.username = b.createdBy AND b.status = 2
            JOIN BillDetailEntity bd ON bd.billId = b.id
        WHERE bd.courseId = ?1 AND bd.timetableId is null
    """)
    List<ISearchUserResponse> getPaidStudent(long courseId);
}
