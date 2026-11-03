import type { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    error?: string;
    isValid?: boolean;
}

export function TextInput({ id, error, isValid, className = '', ...props }: TextInputProps) {
    const stateClass = error ? 'input-error' : isValid ? 'input-success' : '';

    return (
        <input
            id={id}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`input w-full ${stateClass} ${className}`}
            {...props}
        />
    );
}
