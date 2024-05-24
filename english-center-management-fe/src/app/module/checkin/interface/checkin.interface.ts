import { CreateCheckStudentRequest } from './checkin-student.interface';

export interface CreateCheckinRequest {
    timetableDetailId: number;
    details: CreateCheckStudentRequest[];
}

export interface SearchCheckinRequest {
    courseId: number;
    classRoomId: number;
    createdDate: Date;
}

export interface SearchCheckinResponse {
    id: number;
    courseName: string;
    classRoomName: string;
    teacherName: string;
    startTime: string;
    day: number;
    checkinDate: Date;
    createdBy: string;
}
