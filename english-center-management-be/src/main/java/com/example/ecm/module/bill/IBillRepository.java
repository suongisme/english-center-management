package com.example.ecm.module.bill;

import com.example.ecm.module.bill.request.SearchBillRequest;
import com.example.ecm.module.bill.response.IGetUserBillResponse;
import com.example.ecm.module.bill.response.IStatisticBillResponse;
import jakarta.persistence.Tuple;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface IBillRepository extends JpaRepository<BillEntity, Long> {

    @Query("""
                SELECT b FROM BillEntity b
                WHERE b.createdBy = :#{#data.username}
                    AND (:#{#data.fromDate} IS NULL OR :#{#data.fromDate} <= date(b.createdDate))
                    AND (:#{#data.toDate} IS NULL OR :#{#data.toDate} >= date(b.createdDate))
                ORDER BY b.createdDate DESC
            """)
    List<IGetUserBillResponse> searchBy(@Param("data") SearchBillRequest request);

    @Query("SELECT b FROM BillEntity b WHERE b.status = 1")
    List<BillEntity> getWaitPaymentBill();

    @Query("""
        SELECT sum(b.totalPrice) as totalPrice, month(b.createdDate) as month
        FROM BillEntity b
        WHERE b.status = 2 AND year(b.createdDate) = ?1
        GROUP BY month(b.createdDate)
        ORDER BY month(b.createdDate)
    """)
    List<Tuple> statisticBillByYear(Long year);

    @Query("""
        SELECT sum(b.totalPrice) as totalPrice, month(b.createdDate) as month
        FROM BillEntity b
        WHERE b.status = 2 AND year(b.createdDate) = ?1 and month(b.createdDate) <= (?2 * 3)
        GROUP BY month(b.createdDate)
        ORDER BY month(b.createdDate)
    """)
    List<Tuple> statisticBillByQuarter(Long year, Integer quarter);

    @Query("""
        SELECT count(b.id) as totalBill, sum(b.totalPrice) as totalPrice
        FROM BillEntity b
        WHERE b.status = 2 AND (?1 IS NULL OR date(b.createdDate) = ?1)
    """)
    IStatisticBillResponse statisticBill(Date date);
}
