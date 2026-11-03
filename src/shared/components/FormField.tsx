import type { ReactNode } from 'react';

interface FormFieldProps {
    label: string;
    htmlFor: string;
    error?: string;
    hint?: string;
    children: ReactNode;
}

export function FormField({ label, htmlFor, error, hint, children }: FormFieldProps) {
    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">
                <label htmlFor={htmlFor}>{label}</label>
            </legend>
            {children}
            {error ? (
                <p id={`${htmlFor}-error`} role="alert" className="label text-error">
                    {error}
                </p>
            ) : hint ? (
                <p className="label">{hint}</p>
            ) : null}
        </fieldset>
    );
}
