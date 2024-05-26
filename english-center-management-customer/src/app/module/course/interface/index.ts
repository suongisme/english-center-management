export interface Course extends CourseItem {
    description: string;
}

export interface CourseItem {
    id: number;
    avatarUrl: string;
    name: string;
    shortDescription: string;
    price: number;
    discount: number;
    numberOfLesson: number;
    duration: number;
    createdDate: number;
    createdBy: number;
    updatedDate: number;
    updatedBy: string;
}

export interface SearchCourseRequest {
    status?: 0 | 1;
}
