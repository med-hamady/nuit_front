import { cn } from '@/lib/utils';

interface GaugeDisplayProps {
  label: string;
  value: number;
  emoji: string;
  colorClass: string;
}

export function GaugeDisplay({ label, value, emoji, colorClass }: GaugeDisplayProps) {
  const displayValue = Math.round(value);

  return (
    <div className="flex items-center gap-3">
      <img src={emoji} alt={label} className="w-6 h-6 flex-shrink-0 object-contain" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className={cn("text-sm font-bold tabular-nums", colorClass)}>
            {displayValue}/100
          </span>
        </div>
        <div
          className="h-3 bg-muted rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={displayValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Niveau de ${label}`}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              colorClass.replace('text-', 'bg-')
            )}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );
}
