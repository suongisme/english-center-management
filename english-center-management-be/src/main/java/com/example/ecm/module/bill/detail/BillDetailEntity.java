package com.example.ecm.module.bill.detail;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "TB_BILL_DETAIL")
@Setter
@Getter
public class BillDetailEntity {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "BILL_ID")
    private Long billId;

    @Column(name = "COURSE_ID")
    private Long courseId;

    @Column(name = "PRICE")
    private BigDecimal price;

    @Column(name = "DISCOUNT")
    private BigDecimal discount;

    @Column(name = "TIMETABLE_ID")
    private Long timetableId;
}
