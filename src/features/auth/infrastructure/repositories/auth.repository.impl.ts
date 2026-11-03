import { AuthRepository, LoginCredentials, RegisterData } from '../../domain/repositories/auth.repository';
import { User } from '../../domain/entities/user';
import { AuthRemoteDataSource } from '../datasources/auth-datasource.interface';
import { UserMapper } from '../mappers/user.mapper';

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private remoteDataSource: AuthRemoteDataSource) {}

    async login(credentials: LoginCredentials): Promise<User> {
        const dto = await this.remoteDataSource.login(credentials);
        const user = UserMapper.toDomain(dto);
        if (user.token) {
            localStorage.setItem('token', user.token);
        }
        return user;
    }

    async register(data: RegisterData): Promise<User> {
        const dto = await this.remoteDataSource.register(data);
        const user = UserMapper.toDomain(dto);
        if (user.token) {
            localStorage.setItem('token', user.token);
        }
        return user;
    }

    async logout(): Promise<void> {
        localStorage.removeItem('token');
    }

    async checkSession(): Promise<User | null> {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const dto = await this.remoteDataSource.checkSession(token);
            if (!dto) {
                localStorage.removeItem('token');
                return null;
            }
            return UserMapper.toDomain(dto);
        } catch (error) {
            localStorage.removeItem('token');
            return null;
        }
    }
}