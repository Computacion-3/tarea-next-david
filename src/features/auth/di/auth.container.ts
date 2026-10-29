import { AuthMockDataSource } from '../infrastructure/datasources/auth-mock.datasource';
import { AuthRepositoryImpl } from '../infrastructure/repositories/auth.repository.impl';
import { LoginUserUseCase } from '../domain/usecases/login-user.usecase';
import { RegisterUserUseCase } from '../domain/usecases/register-user.usecase';

const authDataSource = new AuthMockDataSource();
const authRepository = new AuthRepositoryImpl(authDataSource);

export const loginUseCase = new LoginUserUseCase(authRepository);
export const registerUseCase = new RegisterUserUseCase(authRepository);