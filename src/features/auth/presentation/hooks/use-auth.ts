'use client';

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { loginThunk, registerThunk, checkSessionThunk, logoutThunk, clearError } from '../store/auth.slice';
import { LoginCredentials, RegisterData } from '../../domain/repositories/auth.repository';

export function useAuth() {
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.auth.user);
    const isMutating = useAppSelector((state) => state.auth.isMutating);
    const isCheckingSession = useAppSelector((state) => state.auth.isCheckingSession);
    const errorMessage = useAppSelector((state) => state.auth.errorMessage);

    const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
        const resultAction = await dispatch(loginThunk(credentials));
        return loginThunk.fulfilled.match(resultAction);
    }, [dispatch]);

    const register = useCallback(async (data: RegisterData): Promise<boolean> => {
        const resultAction = await dispatch(registerThunk(data));
        return registerThunk.fulfilled.match(resultAction);
    }, [dispatch]);

    const logout = useCallback(async (): Promise<void> => {
        await dispatch(logoutThunk());
    }, [dispatch]);

    const resetError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    const checkSession = useCallback(() => {
        dispatch(checkSessionThunk());
    }, [dispatch]);

    return {
        user,
        isAuthenticated: user !== null,
        isLoading: isMutating,
        isCheckingSession,
        errorMessage,
        login,
        register,
        logout,
        resetError,
        checkSession,
    };
}
