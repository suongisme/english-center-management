package com.example.ecm.module.resource.validator;

import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.module.timetable.ITimetableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component("TIMETABLE")
@RequiredArgsConstructor
public class TimetableResourceValidator implements IResourceValidator {

    private final ITimetableRepository timetableRepository;

    @Override
    public void validate(Long keyId) throws Exception {
        this.timetableRepository.findById(keyId)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
    }
}
