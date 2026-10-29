import { User } from '../entities/user';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface AuthRepository {
    login(credentials: LoginCredentials): Promise<User>;
    register(data: RegisterData): Promise<User>;
    logout(): Promise<void>;
}