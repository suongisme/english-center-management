package com.example.ecm.module.timetable.gradebook.impl;

import com.example.ecm.constant.AppConstant;
import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.model.SearchResponse;
import com.example.ecm.module.timetable.ITimetableService;
import com.example.ecm.module.timetable.TimetableEntity;
import com.example.ecm.module.timetable.gradebook.*;
import com.example.ecm.module.timetable.gradebook.request.CreateTimetableGradeBookRequest;
import com.example.ecm.module.timetable.gradebook.request.GetStatisticScoreRequest;
import com.example.ecm.module.timetable.gradebook.response.IGetGradeBookDetailResponse;
import com.example.ecm.module.timetable.gradebook.response.IGetStatisticScoreResponse;
import com.example.ecm.module.timetable.gradebook.response.ISearchGradeBookResponse;
import com.example.ecm.module.user.IUserService;
import com.example.ecm.module.user.UserEntity;
import com.example.ecm.utils.AuthenticationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TimetableGradeBookServiceImpl implements ITimetableGradeBookService {

    private final ITimetableGradeBookRepository timetableGradeBookRepository;
    private final ITimetableGradeBookDetailRepository timetableGradeBookDetailRepository;

    private final ITimetableService timetableService;
    private final IUserService userService;

    @Override
    public ApiBody searchGradebook() {
        final Page<ISearchGradeBookResponse> page = this.timetableGradeBookRepository.searchBy(Pageable.unpaged(Sort.by(Sort.Direction.DESC, "createdDate")));
        final SearchResponse<ISearchGradeBookResponse> response = SearchResponse.of(page);
        return ApiBody.of(response);
    }

    @Override
    public ApiBody getDetail(long id) {
        final List<IGetGradeBookDetailResponse> response = this.timetableGradeBookDetailRepository.findByGradeBookdId(id);
        return ApiBody.of(response);
    }

    @Override
    public ApiBody getStudentAndScore(long timetableID) {
        final List<IGetGradeBookDetailResponse> studentAndScore = this.timetableGradeBookRepository.getStudentAndScore(timetableID);
        return ApiBody.of(studentAndScore);
    }

    @Override
    @Transactional
    public void createGradeBook(CreateTimetableGradeBookRequest createTimetableGradeBookRequest) {
        final TimetableEntity timetable = this.timetableService.findByIdThrowIfNotPresent(createTimetableGradeBookRequest.getTimetableId());
        if (timetable.getStatus() != AppConstant.INACTIVE) {
            throw new BusinessException(ErrorCode.VALIDATE_FAIL);
        }
        final UserEntity teacher = this.userService.findByIdThrowIfNotPresent(timetable.getTeacherId());
        if (!teacher.getUsername().equals(AuthenticationUtil.getUsername())) {
            throw new BusinessException(ErrorCode.FORBIDDEN);
        }
        TimetableGradeBookEntity entity = new TimetableGradeBookEntity();
        entity.setTimetableId(timetable.getId());
        this.timetableGradeBookRepository.save(entity);
        final List<TimetableGradeBookDetailEntity> entities = createTimetableGradeBookRequest.getDetails().stream()
                .map(detail -> {
                    TimetableGradeBookDetailEntity timetableGradeBookDetailEntity = new TimetableGradeBookDetailEntity();
                    timetableGradeBookDetailEntity.setStudentId(detail.getStudentId());
                    timetableGradeBookDetailEntity.setScore(detail.getScore());
                    timetableGradeBookDetailEntity.setNote(detail.getNote());
                    timetableGradeBookDetailEntity.setGradebookId(entity.getId());
                    return timetableGradeBookDetailEntity;
                })
                .toList();
        this.timetableGradeBookDetailRepository.saveAll(entities);
    }

    @Override
    public ApiBody statisticScore(SearchRequest<GetStatisticScoreRequest> searchRequest) {
        Pageable pageable = Pageable.unpaged();
        if (searchRequest.isPaged()) {
            pageable = PageRequest.of(searchRequest.getPageNo() - 1, searchRequest.getPageSize());
        }
        final GetStatisticScoreRequest data = Optional.ofNullable(searchRequest.getData())
                .orElseGet(GetStatisticScoreRequest::new);
        final Page<IGetStatisticScoreResponse> page = this.timetableGradeBookRepository.statisticScore(data, pageable);
        final SearchResponse<IGetStatisticScoreResponse> response = SearchResponse.of(page);
        return ApiBody.of(response);
    }
}
