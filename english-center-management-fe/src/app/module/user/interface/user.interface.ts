import { Role } from '../constant';

export interface CreateUser {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dob: Date;
    address: string;
    role: Role;
    username: string;
    password: string;
}

export interface UpdateUser extends CreateUser {
    id: number;
}

export interface UserSearchRequest {
    fullName?: string;
    status?: number;
    role?: Role;
    userIds?: number[];
}

export interface UserSearchResponse extends UpdateUser {}

export interface GetStatisticUserRequest {
    name?: string;
}

export interface GetStatisticUserResponse {
    id: number;
    studentName: string;
    totalPresent: number;
    totalAbsent: number;
    totalCourse: number;
}
