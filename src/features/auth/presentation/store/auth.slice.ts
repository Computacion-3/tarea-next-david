import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../domain/entities/user';
import { LoginCredentials, RegisterData } from '../../domain/repositories/auth.repository';
import { loginUseCase, registerUseCase } from '../../di/auth.container';

interface AuthState {
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    status: 'idle',
    error: null,
};

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            return await loginUseCase.execute(credentials);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Credenciales inválidas');
        }
    }
);

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (data: RegisterData, { rejectWithValue }) => {
        try {
            return await registerUseCase.execute(data);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Error al registrar el usuario');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.status = 'idle';
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // Register
            .addCase(registerThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerThunk.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;