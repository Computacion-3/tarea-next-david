import { AuthRepository, RegisterData } from '../repositories/auth.repository';
import { User } from '../entities/user';

export class RegisterUserUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    async execute(data: RegisterData): Promise<User> {
        const normalized: RegisterData = {
            name: data.name.trim(),
            email: data.email.trim().toLowerCase(),
            password: data.password,
        };

        const error = User.firstError(User.validateRegistration(normalized));
        if (error) throw new Error(error);

        return await this.authRepository.register(normalized);
    }
}
