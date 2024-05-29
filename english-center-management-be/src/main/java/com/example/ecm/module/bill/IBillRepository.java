package com.example.ecm.module.bill;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IBillRepository extends JpaRepository<BillEntity, Long> {
}
