import { RoutineItemViewModel } from '../viewmodels/routine.viewmodel';
import { CategoryBadge } from './CategoryBadge';

interface RoutineCardProps {
  routine: RoutineItemViewModel;
}

export function RoutineCard({ routine }: RoutineCardProps) {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
          <div>
            <h3 className="card-title text-base">{routine.title}</h3>
            <p className="text-sm opacity-70 mt-1">{routine.descriptionText}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <CategoryBadge label={routine.categoryLabel} badgeClass={routine.categoryBadgeClass} />
            <span className={`badge ${routine.isRecent ? 'badge-accent' : 'badge-ghost'}`}>
              {routine.badgeText}
            </span>
          </div>
        </div>

        <div className="card-actions justify-end mt-2 pt-2 border-t border-base-200 text-xs opacity-50">
          <span>Creado el {routine.formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
