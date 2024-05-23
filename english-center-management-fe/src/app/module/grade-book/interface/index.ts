export interface CreateGradeBookRequest {
    timetableId: number;
    details: CreateGradeBookDetailRequest[];
}

export interface CreateGradeBookDetailRequest {
    studentId: number;
    score: number;
    note: string;
}

export interface SearchGradeBookResponse {
    id: number;
    teacherName: string;
    courseName: number;
    classRoomName: string;
    createdBy: string;
    createdDate: number;
}

export interface DetailResponse {
    name: string;
    id: number;
    score: number;
    note: string;
}
