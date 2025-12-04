import { useVillage } from '@/contexts/VillageContext';
import { ACHIEVEMENT_BADGES } from '@/data/simulationContent';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BadgesPanel() {
    const { choices } = useVillage();

    // Collecter tous les badges débloqués
    const unlockedBadges = Object.entries(choices)
        .map(([category, choiceId]) => {
            if (!choiceId) return null;
            const categoryBadges = ACHIEVEMENT_BADGES[category as keyof typeof ACHIEVEMENT_BADGES];
            if (!categoryBadges) return null;
            return categoryBadges[choiceId as keyof typeof categoryBadges];
        })
        .filter(Boolean);

    if (unlockedBadges.length === 0) {
        return null;
    }

    return (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-building">
            <h3 className="font-heading font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Tes Succès Débloqués ({unlockedBadges.length}/4)
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {unlockedBadges.map((badge: any) => (
                    <div
                        key={badge.id}
                        className={cn(
                            "relative p-4 rounded-xl border-2 text-center transition-all duration-300",
                            "hover:scale-105 hover:shadow-lg",
                            "animate-bounce-in",
                            badge.color === 'primary' && "bg-primary/10 border-primary/30",
                            badge.color === 'secondary' && "bg-secondary/10 border-secondary/30",
                            badge.color === 'accent' && "bg-accent/10 border-accent/30"
                        )}
                    >
                        {/* Emoji */}
                        <div className="text-4xl mb-2">{badge.emoji}</div>

                        {/* Title */}
                        <h4 className="font-heading font-bold text-sm text-foreground mb-1">
                            {badge.title}
                        </h4>

                        {/* Description (tooltip on hover) */}
                        <p className="text-xs text-muted-foreground leading-snug">
                            {badge.description}
                        </p>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                    </div>
                ))}
            </div>

            {/* Message si tous les badges */}
            {unlockedBadges.length === 4 && (
                <div className="mt-4 p-3 bg-primary/10 rounded-lg text-center">
                    <span className="text-lg">🎉</span>
                    <span className="ml-2 text-primary font-bold text-sm">
                        Félicitations ! Tu as débloqué tous les succès !
                    </span>
                </div>
            )}
        </div>
    );
}
