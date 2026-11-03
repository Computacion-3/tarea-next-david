import { Routine } from '../../domain/entities/routine';
import { isRoutineCategory } from '../../domain/entities/routine-category';
import { CreateRoutineParams } from '../../domain/repositories/routine.repository';
import { RoutineResponseDto, CreateRoutineDto } from '../dtos/routine.dto';

export class RoutineMapper {
    static toDomain(dto: RoutineResponseDto): Routine {
        // El backend devuelve un string; lo normalizamos y verificamos antes de crear la entidad.
        const category = dto.category?.toLowerCase();
        if (!isRoutineCategory(category)) {
            throw new Error(`La rutina #${dto.id} tiene una categoría desconocida: "${dto.category}".`);
        }

        return new Routine({
            id: dto.id,
            name: dto.name,
            description: dto.description ?? undefined,
            createdAt: new Date(dto.created_at),
            category,
        });
    }

    static toDto(params: CreateRoutineParams): CreateRoutineDto {
        return {
            name: params.name.trim(),
            description: params.description?.trim() || undefined,
            category: params.category,
            userId: 1,
        };
    }
}
