import { AuthMockDataSource } from '../infrastructure/datasources/auth-mock.datasource';
import { AuthLocalStorageDataSource } from '../infrastructure/datasources/auth-local.datasource';
import { AuthRepositoryImpl } from '../infrastructure/repositories/auth.repository.impl';
import { LoginUserUseCase } from '../domain/usecases/login-user.usecase';
import { RegisterUserUseCase } from '../domain/usecases/register-user.usecase';
import { LogoutUserUseCase } from '../domain/usecases/logout-user.usecase';
import { CheckSessionUseCase } from '../domain/usecases/check-session.usecase';

const authRemoteDataSource = new AuthMockDataSource();
const authLocalDataSource = new AuthLocalStorageDataSource();
const authRepository = new AuthRepositoryImpl(authRemoteDataSource, authLocalDataSource);

export const authContainer = {
    login: new LoginUserUseCase(authRepository),
    register: new RegisterUserUseCase(authRepository),
    logout: new LogoutUserUseCase(authRepository),
    checkSession: new CheckSessionUseCase(authRepository),
};
