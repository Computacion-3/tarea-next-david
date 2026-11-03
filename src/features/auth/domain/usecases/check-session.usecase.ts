import { AuthRepository } from '../repositories/auth.repository';
import { User } from '../entities/user';

export class CheckSessionUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(): Promise<User | null> {
        return await this.authRepository.checkSession();
    }
}