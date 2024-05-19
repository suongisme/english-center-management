package com.example.ecm.module.class_room.impl;

import com.example.ecm.constant.ErrorCode;
import com.example.ecm.exception.BusinessException;
import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.model.SearchResponse;
import com.example.ecm.module.class_room.ClassRoomEntity;
import com.example.ecm.module.class_room.IClassRoomRepository;
import com.example.ecm.module.class_room.IClassRoomService;
import com.example.ecm.module.class_room.request.CreateClassRoomRequest;
import com.example.ecm.module.class_room.request.SearchClassRoomRequest;
import com.example.ecm.module.class_room.request.UpdateClassRoomRequest;
import com.example.ecm.module.class_room.response.ISearchClassRoomResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClassRoomServiceImpl implements IClassRoomService {

    private final IClassRoomRepository classRoomRepository;

    @Override
    public ClassRoomEntity findByIdThrowIfNotPresent(Long id) {
        return this.classRoomRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
    }

    @Override
    public ApiBody searchClassRoom(SearchRequest<SearchClassRoomRequest> searchRequest) {
        Pageable pageable = Pageable.unpaged();
        if (searchRequest.isPaged()) {
            pageable = PageRequest.of(searchRequest.getPageNo() - 1, searchRequest.getPageSize(), Sort.Direction.DESC, "createdDate");
        }
        final SearchClassRoomRequest data = Optional.ofNullable(searchRequest.getData()).orElseGet(SearchClassRoomRequest::new);
        final Page<ISearchClassRoomResponse> page = this.classRoomRepository.searchBy(data, pageable);
        final SearchResponse<ISearchClassRoomResponse> response = SearchResponse.of(page);
        return ApiBody.of(response);
    }

    @Override
    public void createClassRoom(CreateClassRoomRequest createClassRoomRequest) {
        final ClassRoomEntity entity = createClassRoomRequest.toEntity();
        this.classRoomRepository.save(entity);
    }

    @Override
    public void updateClassRoom(UpdateClassRoomRequest updateClassRoomRequest) {
        final ClassRoomEntity classRoom = this.classRoomRepository.findById(updateClassRoomRequest.getId())
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_RECORD));
        final ClassRoomEntity entity = updateClassRoomRequest.toEntity();
        entity.setId(classRoom.getId());
        this.classRoomRepository.save(entity);
    }
}
