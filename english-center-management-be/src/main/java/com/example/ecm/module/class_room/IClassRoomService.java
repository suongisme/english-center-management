package com.example.ecm.module.class_room;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.SearchRequest;
import com.example.ecm.module.class_room.request.CreateClassRoomRequest;
import com.example.ecm.module.class_room.request.SearchClassRoomRequest;
import com.example.ecm.module.class_room.request.UpdateClassRoomRequest;

public interface IClassRoomService {

    void createClassRoom(CreateClassRoomRequest createClassRoomRequest);

    void updateClassRoom(UpdateClassRoomRequest updateClassRoomRequest);

    ApiBody searchClassRoom(SearchRequest<SearchClassRoomRequest> searchRequest);

    ClassRoomEntity findByIdThrowIfNotPresent(Long id);
}
