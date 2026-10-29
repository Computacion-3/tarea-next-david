import { AuthRemoteDataSource } from './auth-datasource.interface';
import { LoginCredentials, RegisterData } from '../../domain/repositories/auth.repository';
import { UserResponseDto } from '../dtos/user.dto';

export class AuthMockDataSource implements AuthRemoteDataSource {
    async login(credentials: LoginCredentials): Promise<UserResponseDto> {
        await new Promise((resolve) => setTimeout(resolve, 600));

        if (credentials.email === 'error@test.com') {
            throw new Error('Credenciales incorrectas (Error simulado)');
        }

        return {
            id: 'user-mock-uuid-123',
            name: 'David Chicué',
            email: credentials.email,
            token: 'mock-jwt-token-super-secreto-xyz',
        };
    }

    async register(data: RegisterData): Promise<UserResponseDto> {
        await new Promise((resolve) => setTimeout(resolve, 600));

        if (data.email === 'existente@test.com') {
            throw new Error('El correo electrónico ya está registrado.');
        }

        return {
            id: `user-mock-uuid-${Date.now()}`,
            name: data.name,
            email: data.email,
            token: 'mock-jwt-token-super-secreto-xyz',
        };
    }
}