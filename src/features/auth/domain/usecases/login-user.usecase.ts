import { AuthRepository, LoginCredentials } from '../repositories/auth.repository';
import { User } from '../entities/user';

export class LoginUserUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(credentials: LoginCredentials): Promise<User> {
        return await this.authRepository.login(credentials);
    }
}