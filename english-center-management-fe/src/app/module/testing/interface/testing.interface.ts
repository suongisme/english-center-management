import { SearchQuestionResponse } from '@ecm-module/question';

export interface SearchTestingRequest {
    courseId?: number;
    name?: string;
    status?: number;
}

export interface SearchTestingResponse {
    id: number;
    name: string;
    courseId: number;
    courseName: string;
    createdDate: number;
    createdBy: string;
    status: number;
    questionSize: number;
    minimumScore: number;
}

export interface CreateTestingRequest {
    name: string;
    courseId: number;
    status: number;
    questionIds: number[];
    minimumScore: number;
}

export interface UpdateTestingRequest extends CreateTestingRequest {
    id: number;
}

export interface GetTestingResponse {
    id: number;
    name: string;
    courseId: number;
    createdDate: number;
    createdBy: string;
    status: number;
    questions: SearchQuestionResponse[];
    minimumScore: number;
}
