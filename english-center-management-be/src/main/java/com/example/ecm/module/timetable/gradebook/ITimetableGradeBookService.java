package com.example.ecm.module.timetable.gradebook;

import com.example.ecm.model.ApiBody;
import com.example.ecm.model.ApiResponse;
import com.example.ecm.module.timetable.gradebook.request.CreateTimetableGradeBookRequest;

public interface ITimetableGradeBookService {

    ApiBody searchGradebook();

    ApiBody getDetail(long id);

    ApiBody getStudentAndScore(long timetableID);

    void createGradeBook(CreateTimetableGradeBookRequest createTimetableGradeBookRequest);
}
