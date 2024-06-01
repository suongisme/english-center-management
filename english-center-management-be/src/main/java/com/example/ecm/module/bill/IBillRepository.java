package com.example.ecm.module.bill;

import com.example.ecm.module.bill.request.SearchBillRequest;
import com.example.ecm.module.bill.response.IGetUserBillResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IBillRepository extends JpaRepository<BillEntity, Long> {

    @Query("""
                SELECT b FROM BillEntity b
                WHERE b.createdBy = :#{#data.username}
                    AND (:#{#data.fromDate} IS NULL OR :#{#data.fromDate} <= b.createdDate)
                    AND (:#{#data.toDate} IS NULL OR :#{#data.toDate} >= b.createdDate)
                ORDER BY b.createdDate DESC
            """)
    List<IGetUserBillResponse> searchBy(@Param("data") SearchBillRequest request);

    @Query("SELECT b FROM BillEntity b WHERE b.status = 1")
    List<BillEntity> getWaitPaymentBill();
}
