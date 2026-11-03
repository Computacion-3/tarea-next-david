import { User } from '../../domain/entities/user';

export interface UserViewModel {
    readonly id: string;
    readonly name: string;
    readonly email: string;
}

export class UserViewModelMapper {
    static toViewModel(entity: User): UserViewModel {
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
        };
    }
}