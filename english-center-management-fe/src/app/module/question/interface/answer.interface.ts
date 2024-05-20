export interface AnswerResponse {
    id: number;
    title: string;
    questionId: number;
    createdDate: number;
    createdBy: string;
    correct?: boolean;
}

export interface CreateAnswerRequest {
    title: string;
    correct: boolean;
}
