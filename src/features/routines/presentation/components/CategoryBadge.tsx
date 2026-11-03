interface CategoryBadgeProps {
    label: string;
    badgeClass: string;
    className?: string;
}

export function CategoryBadge({ label, badgeClass, className = '' }: CategoryBadgeProps) {
    return <span className={`badge badge-soft ${badgeClass} ${className}`}>{label}</span>;
}
