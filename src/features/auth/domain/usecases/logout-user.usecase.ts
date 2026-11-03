import { AuthRepository } from '../repositories/auth.repository';

export class LogoutUserUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    async execute(): Promise<void> {
        await this.authRepository.logout();
    }
}
