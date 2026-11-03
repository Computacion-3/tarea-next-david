import { AuthRemoteDataSource } from './auth-datasource.interface';
import { LoginCredentials, RegisterData } from '../../domain/repositories/auth.repository';
import { UserResponseDto } from '../dtos/user.dto';

const MOCK_DB_KEY = 'mock_users_db';

interface MockUser extends RegisterData {
    id: string;
}

export class AuthMockDataSource implements AuthRemoteDataSource {

    private getUsers(): MockUser[] {
        const storedUsers = localStorage.getItem(MOCK_DB_KEY);
        if (storedUsers) {
            return JSON.parse(storedUsers);
        }

        const defaultUsers: MockUser[] = [
            {
                id: 'mock-uuid-admin-1',
                name: 'Administrador',
                email: 'admin@gym.com',
                password: 'password123'
            }
        ];
        this.saveUsers(defaultUsers);
        return defaultUsers;
    }

    private saveUsers(users: MockUser[]): void {
        localStorage.setItem(MOCK_DB_KEY, JSON.stringify(users));
    }

    async login(credentials: LoginCredentials): Promise<UserResponseDto> {
        await new Promise((resolve) => setTimeout(resolve, 600));

        const users = this.getUsers();

        const user = users.find(
            (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
            throw new Error('Correo o contraseña incorrectos.');
        }

        if (credentials.email === 'error@test.com') {
            throw new Error('Credenciales incorrectas (Error simulado)');
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: `mock-jwt-token-for-${user.id}`,
        };
    }

    async register(data: RegisterData): Promise<UserResponseDto> {
        await new Promise((resolve) => setTimeout(resolve, 600));

        const users = this.getUsers();
            
        const exists = users.some((u) => u.email === data.email);

        if (exists) {
            throw new Error('Este correo electrónico ya está registrado.');
        }

        const newUser: MockUser = {
        id: `mock-uuid-${Date.now()}`,
            name: data.name,
            email: data.email,
            password: data.password
        };

        users.push(newUser);
        this.saveUsers(users);

        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: `mock-jwt-token-for-${newUser.id}`,
        };
    }
}