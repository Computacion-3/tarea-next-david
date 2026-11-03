'use client';

import { useState, type FormEvent } from 'react';
import { CreateRoutineParams } from '../../domain/repositories/routine.repository';
import { RoutineCategory } from '../../domain/entities/routine-category';
import { Routine, RoutineFieldErrors } from '../../domain/entities/routine';
import { CATEGORY_OPTIONS } from '../viewmodels/routine-category.viewmodel';
import { FormField } from '@/src/shared/components/FormField';
import { TextInput } from '@/src/shared/components/TextInput';

interface RoutineFormProps {
    onSubmit: (params: CreateRoutineParams) => Promise<boolean>;
    isLoading: boolean;
    /** Categoría preseleccionada (por ejemplo, la del filtro activo). */
    defaultCategory?: RoutineCategory | null;
}

const EMPTY = { name: '', description: '', category: '' };

export function RoutineForm({ onSubmit, isLoading, defaultCategory }: RoutineFormProps) {
    const [values, setValues] = useState({ ...EMPTY, category: defaultCategory ?? '' });
    const [submitted, setSubmitted] = useState(false);

    const errors: RoutineFieldErrors = submitted ? Routine.validateFields(values) : {};

    const set = (field: keyof typeof values) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
            setValues((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);

        if (Routine.hasErrors(Routine.validateFields(values))) return;

        const success = await onSubmit({
            name: values.name.trim(),
            description: values.description.trim() || undefined,
            category: values.category as RoutineCategory,
        });

        if (success) {
            setValues({ ...EMPTY, category: defaultCategory ?? '' });
            setSubmitted(false);
        }
    };

    return (
        <div className="card bg-base-100 shadow-sm border border-base-200">
            <form onSubmit={handleSubmit} className="card-body gap-2" noValidate>
                <h2 className="card-title text-lg">Crear nueva rutina</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <FormField label="Nombre de la rutina *" htmlFor="routine-name" error={errors.name}>
                        <TextInput
                            id="routine-name"
                            type="text"
                            value={values.name}
                            onChange={set('name')}
                            disabled={isLoading}
                            placeholder="Ej. Hipertrofia Tren Superior"
                            error={errors.name}
                        />
                    </FormField>

                    <FormField label="Categoría *" htmlFor="routine-category" error={errors.category}>
                        <select
                            id="routine-category"
                            value={values.category}
                            onChange={set('category')}
                            disabled={isLoading}
                            aria-invalid={Boolean(errors.category)}
                            className={`select w-full ${errors.category ? 'select-error' : ''}`}
                        >
                            <option value="" disabled>
                                Selecciona una categoría
                            </option>
                            {CATEGORY_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </FormField>

                    <div className="md:col-span-2">
                        <FormField
                            label="Descripción (opcional)"
                            htmlFor="routine-description"
                            error={errors.description}
                            hint="Si la agregas, mínimo 10 caracteres."
                        >
                            <TextInput
                                id="routine-description"
                                type="text"
                                value={values.description}
                                onChange={set('description')}
                                disabled={isLoading}
                                placeholder="Ej. Enfocada en pecho y hombros"
                                error={errors.description}
                            />
                        </FormField>
                    </div>
                </div>

                <div className="card-actions justify-end">
                    <button type="submit" disabled={isLoading} className="btn btn-primary w-full sm:w-auto">
                        {isLoading && <span className="loading loading-spinner loading-sm"></span>}
                        Guardar rutina
                    </button>
                </div>
            </form>
        </div>
    );
}
