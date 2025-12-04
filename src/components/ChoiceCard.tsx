import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ChoiceCardProps {
  title: string;
  description: string;
  tags: { label: string; variant: 'positive' | 'negative' | 'neutral' }[];
  isSelected: boolean;
  onClick: () => void;
}

export function ChoiceCard({ title, description, tags, isSelected, onClick }: ChoiceCardProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isSelected}
      className={cn(
        "relative w-full p-5 rounded-xl border-2 text-left transition-all duration-200",
        "hover:shadow-building hover:-translate-y-0.5",
        isSelected
          ? "border-primary bg-primary/5 shadow-building"
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-primary-foreground" />
        </div>
      )}

      <h4 className="font-heading font-bold text-foreground mb-2 pr-8">
        {title}
      </h4>

      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={cn(
              "px-2 py-1 text-xs font-medium rounded-full",
              tag.variant === 'positive' && "bg-primary/10 text-primary",
              tag.variant === 'negative' && "bg-destructive/10 text-destructive",
              tag.variant === 'neutral' && "bg-muted text-muted-foreground"
            )}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </button>
  );
}
