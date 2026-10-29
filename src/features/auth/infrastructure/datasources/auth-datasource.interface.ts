import { LoginCredentials, RegisterData } from '../../domain/repositories/auth.repository';
import { UserResponseDto } from '../dtos/user.dto';

export interface AuthRemoteDataSource {
    login(credentials: LoginCredentials): Promise<UserResponseDto>;
    register(data: RegisterData): Promise<UserResponseDto>;
}