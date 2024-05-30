package com.example.ecm.module.bill.detail;

import com.example.ecm.module.bill.response.IGetDetailBillResponse;
import org.springframework.data.jpa.repository.JpaRepository;
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
            LEFT JOIN TimetableEntity t ON bd.timetableId = t.id
            LEFT JOIN ClassRoomEntity cr ON cr.id = t.classRoomId
            LEFT JOIN CourseEntity c ON c.id = t.courseId
            LEFT JOIN UserEntity u ON u.id = t.teacherId
            LEFT JOIN TimetableGradeBookEntity gd ON gd.timetableId = t.id
            LEFT JOIN TimetableGradeBookDetailEntity gdd ON gdd.gradebookId = gd.id AND gdd.studentId = user.id
        WHERE b.id = ?1
    """)
    List<IGetDetailBillResponse> getByBillId(long billId);
}
