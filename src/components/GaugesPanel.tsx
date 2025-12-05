import { useVillage } from '@/contexts/VillageContext';
import { GaugeDisplay } from './GaugeDisplay';

export function GaugesPanel() {
  const { gauges } = useVillage();

  const gaugeConfigs = [
    { key: 'cost', label: 'Coût maîtrisé', emoji: '/cour_metriser.png', colorClass: 'text-yellow-500' },
    { key: 'ecology', label: 'Impact écologique', emoji: '/Impact_ecologique.png', colorClass: 'text-primary' },
    { key: 'autonomy', label: 'Autonomie numérique', emoji: '/autonomie_numerique.png', colorClass: 'text-accent' },
    { key: 'inclusion', label: 'Inclusion', emoji: '/inclusion.png', colorClass: 'text-secondary' },
  ] as const;

  return (
    <>
      <h3 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
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
    </>
  );
}
