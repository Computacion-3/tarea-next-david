import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authContainer } from '../../di/auth.container';
import { LoginCredentials, RegisterData } from '../../domain/repositories/auth.repository';
import { UserViewModel, UserViewModelMapper } from '../viewmodels/user.viewmodel';

interface AuthState {
    user: UserViewModel | null;
    isMutating: boolean;
    isCheckingSession: boolean;
    errorMessage: string | null;
}

const initialState: AuthState = {
    user: null,
    isMutating: false,
    isCheckingSession: true,
    errorMessage: null,
};

export const checkSessionThunk = createAsyncThunk(
    'auth/checkSession',
    async () => {
        const userEntity = await authContainer.checkSession.execute();
        return userEntity ? UserViewModelMapper.toViewModel(userEntity) : null;
    }
);

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const userEntity = await authContainer.login.execute(credentials);
            return UserViewModelMapper.toViewModel(userEntity);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Credenciales inválidas';
            return rejectWithValue(message);
        }
    }
);

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (data: RegisterData, { rejectWithValue }) => {
        try {
            const userEntity = await authContainer.register.execute(data);
            return UserViewModelMapper.toViewModel(userEntity);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Error al registrar el usuario';
            return rejectWithValue(message);
        }
    }
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
    await authContainer.logout.execute();
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.errorMessage = null;
        },
    },
    extraReducers: (builder) => {
        // --- Login ---
        builder
            .addCase(loginThunk.pending, (state) => {
                state.isMutating = true;
                state.errorMessage = null;
            })
            .addCase(loginThunk.fulfilled, (state, action: PayloadAction<UserViewModel>) => {
                state.isMutating = false;
                state.user = action.payload;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.isMutating = false;
                state.errorMessage = (action.payload as string) ?? 'Error al iniciar sesión';
            });

        // --- Register ---
        builder
            .addCase(registerThunk.pending, (state) => {
                state.isMutating = true;
                state.errorMessage = null;
            })
            .addCase(registerThunk.fulfilled, (state, action: PayloadAction<UserViewModel>) => {
                state.isMutating = false;
                state.user = action.payload;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.isMutating = false;
                state.errorMessage = (action.payload as string) ?? 'Error al registrar';
            });

        // --- Logout ---
        builder
            .addCase(logoutThunk.pending, (state) => {
                state.isMutating = true;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.isMutating = false;
                state.user = null;
                state.errorMessage = null;
            })
            .addCase(logoutThunk.rejected, (state) => {
                state.isMutating = false;
                state.user = null;
            });

        // --- Verificación de sesión ---
        builder
            .addCase(checkSessionThunk.pending, (state) => {
                state.isCheckingSession = true;
            })
            .addCase(checkSessionThunk.fulfilled, (state, action: PayloadAction<UserViewModel | null>) => {
                state.user = action.payload;
                state.isCheckingSession = false;
            })
            .addCase(checkSessionThunk.rejected, (state) => {
                state.user = null;
                state.isCheckingSession = false;
            });
    },
});

export const { clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;
