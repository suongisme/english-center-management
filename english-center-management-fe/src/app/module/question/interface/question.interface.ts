import { AnswerResponse, CreateAnswerRequest } from './answer.interface';

export interface SearchQuestionRequest {
    level?: number;
    status?: number;
    title?: string;
}

export interface SearchQuestionResponse {
    id: number;
    createdDate: number;
    createdBy: string;
    status: number;
    level: number;
    score: number;
    title: string;
    answerId?: number;
    answerTitle?: string;
}

export interface GetQuestionResponse extends SearchQuestionResponse {
    answers: AnswerResponse[];
}

export interface CreateQuestionRequest {
    title: string;
    level: number;
    score: number;
    status: number;
    answers: CreateAnswerRequest[];
}

export interface UpdateQuestionRequest extends CreateQuestionRequest {
    id: number;
}
