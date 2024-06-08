export interface CreateTimetableRequest {
    courseId: number;
    classRoomId: number;
    teacherId: number;
    details: CreateTimetableDetailRequest[];
    students: CreateTimetableDetailRequest[];
}

export interface CreateTimetableDetailRequest {
    studentId: number;
}

export interface TimetableResponse {
    id: number;
    courseName: string;
    teacherName: string;
    startTime?: string;
    day?: number;
    classRoomName: string;
    status: number;
    courseDuration: number;
    parentId: number;
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
    createdDate: number;
    createdBy: string;
    status: number;
    students: number[];
    details: GetTimetableDetailResponse[];
}

export interface GetByIdRequest {
    userId: number;
    day?: number;
    status?: number;
}

export interface CreateTimetableDetailRequest {
    day: number;
    startTime: string;
}

export interface GetTimetableDetailResponse {
    id: number;
    day: number;
    startTime: string;
}

export interface SearchTimetableRequest {
    teacherId?: number;
    studentId?: number;
    status?: 0 | 1;
    scored?: boolean;
}

export interface SearchTimetableResponse {
    id: number;
    status: number;
    courseName: string;
    classRoomName: string;
    teacherName: string;
}

export interface GetStatisticTimetableRequest {
    courseId?: number;
}

export interface GetStatisticTimetableResponse {
    id: number;
    className: string;
    teacherName: string;
    status: number;
    totalStudent: number;
}
