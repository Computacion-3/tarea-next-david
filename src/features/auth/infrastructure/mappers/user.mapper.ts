import { User } from '../../domain/entities/user';
import { UserResponseDto } from '../dtos/user.dto';

export class UserMapper {
    static toDomain(dto: UserResponseDto): User {
        return new User({
            id: dto.id,
            name: dto.name,
            email: dto.email,
            token: dto.token,
        });
    }
}