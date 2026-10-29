import { AuthRepository, RegisterData } from '../repositories/auth.repository';
import { User } from '../entities/user';

export class RegisterUserUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(data: RegisterData): Promise<User> {
        return await this.authRepository.register(data);
    }
}