export function FullScreenLoader({ label = 'Cargando...' }: { label?: string }) {
    return (
        <div className="min-h-screen bg-base-200 flex flex-col justify-center items-center gap-3" role="status">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <span className="text-sm opacity-60">{label}</span>
        </div>
    );
}
