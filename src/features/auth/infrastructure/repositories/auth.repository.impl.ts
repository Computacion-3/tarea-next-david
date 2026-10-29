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
}