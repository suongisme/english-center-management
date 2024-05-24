package com.example.ecm.module.timetable.schedule;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(prefix = "schedule.timetable.change-status", value = "enabled", havingValue = "true")
@RequiredArgsConstructor
@Slf4j
public class ChangeStatusSchedule {

    private final JdbcTemplate jdbcTemplate;

    @Scheduled(cron = "${schedule.timetable.change-status.cron}")
    public void changeStatusProcess() {
        log.info("start job: change status timetable");
        final int update = this.jdbcTemplate.update("""
            UPDATE TB_TIMETABLE t
            JOIN TB_COURSE c ON t.COURSE_ID = c.ID
            SET t.STATUS = 0, t.CHECK_DUPLICATE = null
            WHERE c.NUMBER_OF_LESSON <= (
                SELECT COUNT(ck.ID)
                    FROM TB_TIMETABLE_DETAIL td
                    JOIN TB_CHECKIN ck ON ck.TIMETABLE_DETAIL_ID = td.ID
                    WHERE td.TIMETABLE_ID = t.ID
            ) AND t.STATUS = 1
        """);
        log.info("end job: change status timetable rows: {}", update);
    }

}
