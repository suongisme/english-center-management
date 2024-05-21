package com.example.ecm.module.checkin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ICheckinRepository extends JpaRepository<CheckinEntity, Long> {

    @Query("SELECT ck FROM CheckinEntity ck WHERE ck.timetableId = ?1 AND date(ck.createdDate) = current_date")
    Optional<CheckinEntity> findByTimetableIdAndToday(Long timetableId);
}
