package com.example.ecm.module.timetable.schedule;

import com.example.ecm.module.timetable.ITimetableRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(prefix = "schedule.timetable.change-status", value = "enabled", havingValue = "true")
@RequiredArgsConstructor
@Slf4j
public class ChangeStatusSchedule {

    private final ITimetableRepository timetableRepository;

    @Scheduled(cron = "${schedule.timetable.change-status.cron}")
    public void changeStatusProcess() {
    }

}
