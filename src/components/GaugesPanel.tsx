import { useVillage } from '@/contexts/VillageContext';
import { GaugeDisplay } from './GaugeDisplay';

export function GaugesPanel() {
  const { gauges } = useVillage();

  const gaugeConfigs = [
    { key: 'cost', label: 'Coût maîtrisé', emoji: '💰', colorClass: 'text-yellow-500' },
    { key: 'ecology', label: 'Impact écologique', emoji: '🌍', colorClass: 'text-primary' },
    { key: 'autonomy', label: 'Autonomie numérique', emoji: '🔓', colorClass: 'text-accent' },
    { key: 'inclusion', label: 'Inclusion', emoji: '👥', colorClass: 'text-secondary' },
  ] as const;

  return (
    <div className="p-4 bg-card rounded-xl border border-border shadow-village">
      <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        État de ton village numérique
      </h3>
      <div className="space-y-3">
        {gaugeConfigs.map((config) => (
          <GaugeDisplay
            key={config.key}
            label={config.label}
            value={gauges[config.key]}
            emoji={config.emoji}
            colorClass={config.colorClass}
          />
        ))}
      </div>
    </div>
  );
}
