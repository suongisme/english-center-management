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
