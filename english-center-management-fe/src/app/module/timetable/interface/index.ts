export interface CreateTimetableRequest {
    courseId: number;
    classRoomId: number;
    teacherId: number;
    day: number;
    startTime: string;
    status: number;
    students: CreateTimetableDetailRequest[];
}

export interface CreateTimetableDetailRequest {
    studentId: number;
}

export interface TimetableResponse {
    id: number;
    courseName: string;
    teacherName: string;
    startTime: string;
    day: number;
    classRoomName: string;
    status: number;
    courseDuration: number;
}

export interface UserTimetable {
    startTime: string;
    timetables: TimetableResponse[];
}

export interface GetTimetableResponse {
    id: number;
    courseId: number;
    teacherId: number;
    classRoomId: number;
    students: number[];
    createdDate: number;
    createdBy: string;
    day: number;
    startTime: string;
    status: number;
}

export interface GetByIdRequest {
    userId: number;
    day?: number;
    status?: number;
}
