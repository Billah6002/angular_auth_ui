export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface MessageResponse {
    message: string;
}

export interface User {
    sub: string;         // user.Id
    email: string;       // user.Email
    name: string;        // user.Username
    jti: string;         // Guid
    exp: number;
}

export interface UserDetail {
    id: string;
    email: string;
    username: string;
}
