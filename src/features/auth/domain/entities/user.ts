export interface UserProps {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly token?: string;
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_NAME_LENGTH = 2;
export const MIN_PASSWORD_LENGTH = 6;

export class User {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly token?: string;

    constructor(props: UserProps) {
        this.validate(props);
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.token = props.token;
    }

    private validate(props: UserProps): void {
        if (!props.id || props.id.trim() === '') {
            throw new Error('El ID del usuario es obligatorio.');
        }

        const nameError = User.validateName(props.name);
        if (nameError) throw new Error(nameError);

        const emailError = User.validateEmail(props.email);
        if (emailError) throw new Error(emailError);
    }

    static validateName(name: string): string | undefined {
        if (!name || !name.trim()) return 'El nombre es obligatorio.';
        if (name.trim().length < MIN_NAME_LENGTH) {
            return `El nombre debe tener al menos ${MIN_NAME_LENGTH} caracteres.`;
        }
        return undefined;
    }

    static validateEmail(email: string): string | undefined {
        if (!email || !email.trim()) return 'El correo es obligatorio.';
        if (!EMAIL_REGEX.test(email.trim())) return 'Ingresa un correo válido (ej. ana@correo.com).';
        return undefined;
    }

    static validatePassword(password: string): string | undefined {
        if (!password) return 'La contraseña es obligatoria.';
        if (password.length < MIN_PASSWORD_LENGTH) {
            return `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
        }
        return undefined;
    }

    static validateLogin(credentials: { email: string; password: string }): FieldErrors<typeof credentials> {
        const errors: FieldErrors<typeof credentials> = {};
        const emailError = User.validateEmail(credentials.email);
        if (emailError) errors.email = emailError;
        if (!credentials.password) errors.password = 'La contraseña es obligatoria.';
        return errors;
    }

    static validateRegistration(data: { name: string; email: string; password: string }): FieldErrors<typeof data> {
        const errors: FieldErrors<typeof data> = {};
        const nameError = User.validateName(data.name);
        if (nameError) errors.name = nameError;
        const emailError = User.validateEmail(data.email);
        if (emailError) errors.email = emailError;
        const passwordError = User.validatePassword(data.password);
        if (passwordError) errors.password = passwordError;
        return errors;
    }

    static hasErrors<T>(errors: FieldErrors<T>): boolean {
        return Object.values(errors).some(Boolean);
    }

    static firstError<T>(errors: FieldErrors<T>): string | undefined {
        return Object.values(errors).find(Boolean) as string | undefined;
    }
}
