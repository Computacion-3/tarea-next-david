import { AuthRepository, LoginCredentials, RegisterData } from '../../domain/repositories/auth.repository';
import { User } from '../../domain/entities/user';
import { AuthRemoteDataSource } from '../datasources/auth-datasource.interface';
import { AuthLocalDataSource } from '../datasources/auth-local.datasource';
import { UserMapper } from '../mappers/user.mapper';

export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        private readonly remoteDataSource: AuthRemoteDataSource,
        private readonly localDataSource: AuthLocalDataSource,
    ) {}

    async login(credentials: LoginCredentials): Promise<User> {
        const dto = await this.remoteDataSource.login(credentials);
        return this.persistSession(UserMapper.toDomain(dto));
    }

    async register(data: RegisterData): Promise<User> {
        const dto = await this.remoteDataSource.register(data);
        return this.persistSession(UserMapper.toDomain(dto));
    }

    async logout(): Promise<void> {
        this.localDataSource.clearToken();
    }

    async checkSession(): Promise<User | null> {
        const token = this.localDataSource.getToken();
        if (!token) return null;

        try {
            const dto = await this.remoteDataSource.checkSession(token);
            if (!dto) {
                this.localDataSource.clearToken();
                return null;
            }
            return UserMapper.toDomain(dto);
        } catch {
            this.localDataSource.clearToken();
            return null;
        }
    }

    private persistSession(user: User): User {
        if (user.token) {
            this.localDataSource.saveToken(user.token);
        }
        return user;
    }
}
