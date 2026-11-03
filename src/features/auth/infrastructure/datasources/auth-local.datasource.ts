/**
 * Fuente de datos local: guarda el token de sesión en el navegador.
 * Aísla el uso de localStorage para que el repositorio no dependa de él directamente
 * y para no romper el render en el servidor (donde window no existe).
 */
export interface AuthLocalDataSource {
    getToken(): string | null;
    saveToken(token: string): void;
    clearToken(): void;
}

const TOKEN_KEY = 'token';

export class AuthLocalStorageDataSource implements AuthLocalDataSource {
    private get storage(): Storage | null {
        return typeof window === 'undefined' ? null : window.localStorage;
    }

    getToken(): string | null {
        return this.storage?.getItem(TOKEN_KEY) ?? null;
    }

    saveToken(token: string): void {
        this.storage?.setItem(TOKEN_KEY, token);
    }

    clearToken(): void {
        this.storage?.removeItem(TOKEN_KEY);
    }
}
