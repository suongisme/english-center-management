export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dob: number;
    address: string;
    jwt: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}
