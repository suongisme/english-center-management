export interface Question {
    id: number;
    title: string;
    score: number;
    selectedAnswer?: number;
    answers: Answer[];
    answerId: number;
    answerTitle: string;
}

export interface Answer {
    id: number;
    title: string;
    correct?: boolean;
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

export interface SearchTestingRequest {
    name?: string;
    status?: 0 | 1;
    courseId?: number;
}

export interface CheckAnswerResponse {
    correctQuestion: number;
    incorrectQuestion: number;
    score: number;
    totalScore: number;
    minimumScore: number;
    questions: Question[];
}
