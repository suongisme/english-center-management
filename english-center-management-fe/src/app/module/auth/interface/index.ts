export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    id: number;
    username: string;
    jwt: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}
