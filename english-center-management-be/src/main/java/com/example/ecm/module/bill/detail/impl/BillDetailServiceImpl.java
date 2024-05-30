package com.example.ecm.module.bill.detail.impl;

import com.example.ecm.module.bill.detail.IBIllDetailRepository;
import com.example.ecm.module.bill.detail.IBillDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BillDetailServiceImpl implements IBillDetailService {

    private final IBIllDetailRepository detailRepository;

    @Override
    @Transactional
    public void unasignTimetableId(long timetableId) {
        this.detailRepository.updateTimetableIdToNull(timetableId);
    }

    @Override
    public void assignTimetableId(long timetableId, long courseId, List<Long> studentIds) {
        this.detailRepository.updateTimetableId(timetableId, courseId, studentIds);
    }
}
