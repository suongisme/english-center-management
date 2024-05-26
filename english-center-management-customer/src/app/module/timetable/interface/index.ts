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
