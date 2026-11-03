import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks'; // Ajusta según tu ruta global
import { loginThunk, registerThunk,checkSessionThunk, logout as logoutAction, clearError } from '../store/auth.slice';
import { LoginCredentials, RegisterData } from '../../domain/repositories/auth.repository';

export function useAuth() {
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const isMutating = useAppSelector((state) => state.auth.isMutating);
    const isCheckingSession = useAppSelector((state) => state.auth.isCheckingSession);
    const errorMessage = useAppSelector((state) => state.auth.errorMessage);

    const login = async (credentials: LoginCredentials): Promise<boolean> => {
        const resultAction = await dispatch(loginThunk(credentials));
        return loginThunk.fulfilled.match(resultAction);
    };

    const register = async (data: RegisterData): Promise<boolean> => {
        const resultAction = await dispatch(registerThunk(data));
        return registerThunk.fulfilled.match(resultAction);
    };

    const logout = useCallback(() => {
        dispatch(logoutAction());
    }, [dispatch]);

    const resetError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    const checkSession = useCallback(() => {
        dispatch(checkSessionThunk());
    }, [dispatch]);

    return {
        user,
        isLoading: isLoading || isMutating,
        isCheckingSession,
        errorMessage,
        login,
        register,
        logout,
        resetError,
        checkSession,
    };
}