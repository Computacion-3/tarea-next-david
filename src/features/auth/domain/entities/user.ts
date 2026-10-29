export interface UserProps {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly token?: string;
}

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

        if (!props.name || props.name.trim().length < 2) {
            throw new Error('El nombre del usuario debe tener al menos 2 caracteres.');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!props.email || !emailRegex.test(props.email)) {
            throw new Error('El formato del correo electrónico no es válido.');
        }
    }
}