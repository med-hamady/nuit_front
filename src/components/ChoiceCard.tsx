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
        "relative w-full p-4 md:p-5 rounded-xl border-2 text-left transition-all duration-200",
        "hover:shadow-building hover:-translate-y-0.5 active:scale-[0.98]",
        isSelected
          ? "border-primary bg-primary/5 shadow-building"
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 md:top-3 md:right-3 w-5 h-5 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" />
        </div>
      )}

      <h4 className="font-heading font-bold text-sm md:text-base text-foreground mb-1.5 md:mb-2 pr-7 md:pr-8">
        {title}
      </h4>

      <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5 md:gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={cn(
              "px-2 py-0.5 md:py-1 text-xs font-medium rounded-full",
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
