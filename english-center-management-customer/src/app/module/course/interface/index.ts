export interface Course extends CourseItem {
    description: string;
}

export interface CourseItem {
    id: number;
    avatar: string;
    name: string;
    shortDescription: string;
    price: number;
    discount: number;
}
