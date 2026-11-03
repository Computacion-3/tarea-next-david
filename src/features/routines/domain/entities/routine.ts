import { isRoutineCategory, RoutineCategory } from './routine-category';

export interface RoutineProps {
    readonly id: number;
    readonly name: string;
    readonly description?: string;
    readonly createdAt: Date;
    readonly category: RoutineCategory;
}

/** Campos editables de una rutina (lo que llega desde un formulario). */
export interface RoutineFields {
    name: string;
    description?: string;
    category: string;
}

export type RoutineFieldErrors = Partial<Record<keyof RoutineFields, string>>;

export const ROUTINE_NAME_MIN = 3;
export const ROUTINE_NAME_MAX = 100;
export const ROUTINE_DESCRIPTION_MIN = 10;

export class Routine {
    readonly id: number;
    readonly name: string;
    readonly description?: string;
    readonly createdAt: Date;
    readonly category: RoutineCategory;

    constructor(props: RoutineProps) {
        const error = Routine.firstError(Routine.validateFields(props));
        if (error) throw new Error(error);

        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.createdAt = props.createdAt;
        this.category = props.category;
    }

    static validateFields(fields: RoutineFields): RoutineFieldErrors {
        const errors: RoutineFieldErrors = {};
        const name = fields.name?.trim() ?? '';
        const description = fields.description?.trim() ?? '';

        if (name.length < ROUTINE_NAME_MIN) {
            errors.name = `El nombre debe tener al menos ${ROUTINE_NAME_MIN} caracteres.`;
        } else if (name.length > ROUTINE_NAME_MAX) {
            errors.name = `El nombre no puede exceder los ${ROUTINE_NAME_MAX} caracteres.`;
        }

        if (description.length > 0 && description.length < ROUTINE_DESCRIPTION_MIN) {
            errors.description = `La descripción debe tener al menos ${ROUTINE_DESCRIPTION_MIN} caracteres si se proporciona.`;
        }

        if (!fields.category) {
            errors.category = 'Selecciona una categoría.';
        } else if (!isRoutineCategory(fields.category)) {
            errors.category = 'La categoría seleccionada no es válida.';
        }

        return errors;
    }

    static hasErrors(errors: RoutineFieldErrors): boolean {
        return Object.values(errors).some(Boolean);
    }

    static firstError(errors: RoutineFieldErrors): string | undefined {
        return Object.values(errors).find(Boolean);
    }

    hasDescription(): boolean {
        return Boolean(this.description && this.description.trim().length > 0);
    }

    belongsTo(category: RoutineCategory): boolean {
        return this.category === category;
    }
}
