export interface CreateCourseRequest {
    name: string;
    description: string;
    status: number;
    numberOfLesson: number;
    price: number;
    discount: number;
    duration: number;
    avatarFile: File;
}

export interface UpdateCourseRequest extends CreateCourseRequest {
    id: number;
}

export interface SearchCourseRequest {
    name?: string;
    fromPrice?: number;
    toPrice?: number;
    status?: number;
}

export interface SearchCourseResponse extends UpdateCourseRequest {
    createdDate: number;
    createdBy: string;
    avatarUrl: string;
}
