import { Routine } from '../entities/routine';
import { CreateRoutineParams, RoutineRepository } from '../repositories/routine.repository';

export class CreateRoutineUseCase {
    constructor(private readonly repository: RoutineRepository) { }

    async execute(params: CreateRoutineParams): Promise<Routine> {
        // Se valida ANTES de llamar al repositorio para no guardar datos inválidos.
        const error = Routine.firstError(Routine.validateFields(params));
        if (error) throw new Error(error);

        return await this.repository.create(params);
    }
}
