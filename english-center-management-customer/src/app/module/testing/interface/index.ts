export interface Question {
    id: number;
    title: string;
    score: number;
    answers: Answer[];
}

export interface Answer {
    id: number;
    title: string;
}
