package com.example.ecm.module.user;

import com.example.ecm.module.user.request.GetStatisticUserRequest;
import com.example.ecm.module.user.request.SearchUserRequest;
import com.example.ecm.module.user.response.IGetStatisticUserResponse;
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
            AND (:#{#data.userIds} IS NULL OR s.id IN :#{#data.userIds})
    """)
    Page<ISearchUserResponse> searchBy(@Param("data") SearchUserRequest searchStudentRequest, Pageable pageable);

    @Query("""
        SELECT
            u.firstName as firstName,
            u.lastName as lastName,
            u.id as id,
            cks.present as present,
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

    @Query(value = """
        SELECT
            u.id as id,
            u.FIRST_NAME as firstName,
            u.LAST_NAME as lastName,
            SUM(case when cks.present = 1 then 1 else 0 end) as totalPresent,
            SUM(case when cks.present = 0 then 1 else 0 end) as totalAbsent,
            userCourse.totalCourse as totalCourse
        FROM TB_USER u
            LEFT JOIN TB_CHECKIN_STUDENT cks ON cks.STUDENT_ID = u.id
            LEFT JOIN (
                SELECT u.id, count(c.id) as totalCourse
                FROM TB_USER u
                    LEFT JOIN TB_TIMETABLE_STUDENT tbs ON tbs.STUDENT_ID = u.id
                    LEFT JOIN TB_TIMETABLE tb ON tbs.TIMETABLE_ID = tb.id
                    LEFT JOIN TB_COURSE c ON c.id = tb.COURSE_ID
                GROUP BY u.id
            ) as userCourse ON userCourse.id = u.id
        WHERE (:#{#data.name} IS NULL OR concat(u.LAST_NAME, u.FIRST_NAME) LIKE concat('%', :#{#data.name}, '%'))
            AND u.ROLE = 'STUDENT'
        GROUP BY u.id
    """, nativeQuery = true)
    Page<IGetStatisticUserResponse> statisticStudent(GetStatisticUserRequest data, Pageable pageable);
}
