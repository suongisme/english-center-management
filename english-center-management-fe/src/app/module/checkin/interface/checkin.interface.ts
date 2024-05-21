import { CreateCheckStudentRequest } from './checkin-student.interface';

export interface CreateCheckinRequest {
    timetableId: number;
    details: CreateCheckStudentRequest[];
}
