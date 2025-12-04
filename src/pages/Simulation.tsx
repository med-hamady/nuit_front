import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { GaugesPanel } from '@/components/GaugesPanel';
import { ChoiceCard } from '@/components/ChoiceCard';
import { Button } from '@/components/ui/button';
import { useVillage } from '@/contexts/VillageContext';
import { ArrowRight, Laptop, FileText, Cloud, RefreshCw } from 'lucide-react';
import { SIMULATION_CHOICES } from '@/data/simulationContent';

// Icon mapping for dynamic rendering
const iconMap = {
  Laptop: Laptop,
  FileText: FileText,
  Cloud: Cloud,
  RefreshCw: RefreshCw,
} as const;

const Simulation = () => {
  const navigate = useNavigate();
  const { choices, setChoice, allChoicesMade } = useVillage();

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 animate-slide-up">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              Simule les choix de ton lycée
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pour chaque thème, choisis une option. Observe comment ton lycée devient plus ou moins résistant face aux Big Tech.
            </p>
            {/* Step progress indicator */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {SIMULATION_CHOICES.map((section, idx) => (
                <div key={section.id} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${choices[section.id]
                        ? 'bg-primary text-primary-foreground shadow-md scale-110'
                        : 'bg-muted text-muted-foreground'
                      }`}
                    title={section.title}
                  >
                    {idx + 1}
                  </div>
                  {idx < SIMULATION_CHOICES.length - 1 && (
                    <div
                      className={`w-12 h-1 rounded-full transition-colors duration-300 ${choices[section.id] ? 'bg-primary' : 'bg-muted'
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Complète les 4 étapes pour voir ton bilan
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8 max-w-6xl mx-auto">
            {/* Choices */}
            <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {SIMULATION_CHOICES.map((section) => {
                const IconComponent = iconMap[section.icon as keyof typeof iconMap];
                const isComplete = !!choices[section.id];

                return (
                  <div
                    key={section.id}
                    className={`bg-card border-2 rounded-2xl p-6 shadow-building transition-all duration-300 ${isComplete
                        ? 'border-primary/30 shadow-building-hover'
                        : 'border-border hover:border-primary/20'
                      }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2.5 rounded-lg transition-colors ${isComplete ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
                        }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h2 className="font-heading font-bold text-xl text-foreground flex-1">
                        {section.title}
                      </h2>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground">
                        Étape {section.step}/{section.totalSteps}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-5 pl-12">
                      {section.subtitle}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      {section.options.map((option) => (
                        <ChoiceCard
                          key={option.id}
                          title={option.title}
                          description={option.description}
                          tags={option.tags}
                          isSelected={choices[section.id] === option.id}
                          onClick={() => setChoice(section.id, option.id)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar with Gauges */}
            <div className="lg:sticky lg:top-24 h-fit space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <GaugesPanel />

              <div className="p-5 bg-card rounded-xl border-2 border-border shadow-building">
                {allChoicesMade ? (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <p className="text-sm font-medium text-foreground">
                        ✅ Simulation complète !
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">
                      Tu as fait tous tes choix. Découvre maintenant le profil de ton lycée et reçois des conseils personnalisés.
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground mb-4">
                    Choisis une option dans chaque section ({Object.values(choices).filter(Boolean).length}/4 complétées) pour débloquer ton bilan.
                  </p>
                )}
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full gap-2"
                  disabled={!allChoicesMade}
                  onClick={() => navigate('/resultats')}
                >
                  Voir mon bilan
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Simulation;
