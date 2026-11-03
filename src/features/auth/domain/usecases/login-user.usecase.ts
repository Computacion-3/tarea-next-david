import { AuthRepository, LoginCredentials } from '../repositories/auth.repository';
import { User } from '../entities/user';

export class LoginUserUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    async execute(credentials: LoginCredentials): Promise<User> {
        const normalized: LoginCredentials = {
            email: credentials.email.trim().toLowerCase(),
            password: credentials.password,
        };

        const error = User.firstError(User.validateLogin(normalized));
        if (error) throw new Error(error);

        return await this.authRepository.login(normalized);
    }
}
