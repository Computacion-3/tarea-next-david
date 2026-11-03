import { Routine } from '../entities/routine';
import { RoutineCategory } from '../entities/routine-category';

export interface CreateRoutineParams {
    name: string;
    description?: string;
    category: RoutineCategory;
}

export interface RoutineRepository {
    getAll(): Promise<Routine[]>;

    getById(id: number): Promise<Routine | null>;

    create(params: CreateRoutineParams): Promise<Routine>;
}
