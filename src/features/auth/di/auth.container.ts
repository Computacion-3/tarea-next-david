import { AuthMockDataSource } from '../infrastructure/datasources/auth-mock.datasource';
import { AuthRepositoryImpl } from '../infrastructure/repositories/auth.repository.impl';
import { LoginUserUseCase } from '../domain/usecases/login-user.usecase';
import { RegisterUserUseCase } from '../domain/usecases/register-user.usecase';
import { CheckSessionUseCase } from '../domain/usecases/check-session.usecase';

const authDataSource = new AuthMockDataSource();
const authRepository = new AuthRepositoryImpl(authDataSource);

export const authContainer = {
    login: new LoginUserUseCase(authRepository),
    register: new RegisterUserUseCase(authRepository),
    checkSession: new CheckSessionUseCase(authRepository),
};