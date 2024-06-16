package com.example.ecm.module.bill.detail;

import com.example.ecm.module.bill.response.IGetDetailBillResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IBIllDetailRepository extends JpaRepository<BillDetailEntity, Long> {
    @Query("""
        SELECT
             bd.id as id,
             c.name as courseName,
             concat(u.lastName, ' ', u.firstName) as teacherName,
             cr.name as classRoomName,
             bd.price as price,
             bd.discount as discount,
             bd.timetableId as timetableId,
             gdd.score as score,
             gdd.note as note
        FROM BillDetailEntity bd
            JOIN BillEntity b ON b.id = bd.billId
            JOIN UserEntity user ON b.createdBy = user.username
            JOIN CourseEntity c ON c.id = bd.courseId
            LEFT JOIN TimetableEntity t ON bd.timetableId = t.id
            LEFT JOIN ClassRoomEntity cr ON cr.id = t.classRoomId
            LEFT JOIN UserEntity u ON u.id = t.teacherId
            LEFT JOIN TimetableGradeBookEntity gd ON gd.timetableId = t.id
            LEFT JOIN TimetableGradeBookDetailEntity gdd ON gdd.gradebookId = gd.id AND gdd.studentId = user.id
        WHERE b.id = ?1
    """)
    List<IGetDetailBillResponse> getByBillId(long billId);


    @Modifying
    @Query("update BillDetailEntity b set b.timetableId = null where b.timetableId = ?1")
    void updateTimetableIdToNull(long timetableId);

    @Modifying
    @Query(value = """
        UPDATE TB_BILL_DETAIL
        SET TIMETABLE_ID = ?1
        WHERE COURSE_ID = ?2 AND id IN (
            SELECT * FROM (
                select bd.id from TB_BILL bill
                    JOIN TB_BILL_DETAIL bd ON bill.id = bd.BILL_ID
                    JOIN TB_USER u ON u.username = bill.CREATED_BY
                WHERE bd.TIMETABLE_ID IS NULL AND bill.status = 2 AND u.id IN (?3) 
                GROUP BY bd.COURSE_ID, bill.CREATED_BY
            ) as t
        )
    """, nativeQuery = true)
    void updateTimetableId(long timetableId, long courseId, List<Long> studentIds);

    @Modifying
    @Query("DELETE BillDetailEntity d WHERE d.billId = ?1")
    void deleteByBillId(Long billId);
}
