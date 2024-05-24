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
}

export interface UserSearchResponse extends UpdateUser {}