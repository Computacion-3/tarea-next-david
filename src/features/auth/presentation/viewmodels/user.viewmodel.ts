import { User } from '../../domain/entities/user';

export interface UserViewModel {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    /** Iniciales para el avatar del Header (ej. "Ana Pérez" -> "AP"). */
    readonly initials: string;
}

export class UserViewModelMapper {
    static toViewModel(entity: User): UserViewModel {
        const initials = entity.name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join('');

        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            initials,
        };
    }
}
