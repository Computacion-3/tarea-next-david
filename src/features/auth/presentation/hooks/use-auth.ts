import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../store/store';
import { loginThunk, registerThunk, logout } from '../store/auth.slice';
import { LoginCredentials, RegisterData } from '../../domain/repositories/auth.repository';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, status, error } = useSelector((state: RootState) => state.auth);

    return {
        user,
        isLoading: status === 'loading',
        error,
        login: (credentials: LoginCredentials) => dispatch(loginThunk(credentials)),
        register: (data: RegisterData) => dispatch(registerThunk(data)),
        logout: () => dispatch(logout()),
    };
};