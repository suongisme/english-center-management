export interface CreateCheckStudentRequest {
    studentId: number;
    present: boolean;
    note: string;
}

export interface GetStudentAndCheckinResult {
    id: number;
    name: string;
    present: boolean;
    note: string;
}
