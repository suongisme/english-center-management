export interface CreateCheckStudentRequest {
    studentId: number;
    absent: boolean;
    note: string;
}

export interface GetStudentAndCheckinResult {
    id: number;
    name: string;
    absent: boolean;
    note: string;
}
