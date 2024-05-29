package com.example.ecm.module.bill;

import com.example.ecm.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "TB_BILL")
@Setter
@Getter
public class BillEntity extends BaseEntity {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "STATUS")
    private Integer status;

    @Column(name = "METHOD_PAYMENT")
    private String methodPayment;

    @Column(name = "TOTAL_PRICE")
    private BigDecimal totalPrice;

}
