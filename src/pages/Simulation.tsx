import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { GaugesPanel } from '@/components/GaugesPanel';
import { ChoiceCard } from '@/components/ChoiceCard';
import { Button } from '@/components/ui/button';
import { useVillage } from '@/contexts/VillageContext';
import { ArrowRight, Laptop, FileText, Cloud, RefreshCw, Loader2 } from 'lucide-react';
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
  const { choices, setChoice, allChoicesMade, categories, isLoadingCategories } = useVillage();

  // Utiliser les catégories de l'API si disponibles, sinon fallback vers les données locales
  const displayCategories = categories.length > 0 ? categories : SIMULATION_CHOICES;

  if (isLoadingCategories) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Chargement de la simulation...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8 animate-slide-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-2 md:mb-3">
              Simule les choix de ton lycée
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              Pour chaque thème, choisis une option. Observe comment ton lycée devient plus ou moins résistant face aux Big Tech.
            </p>
            {/* Step progress indicator */}
            <div className="mt-4 md:mt-6 flex items-center justify-center gap-1.5 md:gap-2 overflow-x-auto px-4">
              {displayCategories.map((section, idx) => {
                // Utiliser slug si disponible (API), sinon id (données locales)
                // IMPORTANT: Convertir l'ID en string si c'est un nombre
                const sectionKey = section.slug || String(section.id);
                return (
                  <div key={section.id} className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-300 ${choices[sectionKey]
                          ? 'bg-primary text-primary-foreground shadow-md scale-110'
                          : 'bg-muted text-muted-foreground'
                        }`}
                      title={section.title || section.name}
                    >
                      {idx + 1}
                    </div>
                    {idx < displayCategories.length - 1 && (
                      <div
                        className={`w-6 md:w-12 h-1 rounded-full transition-colors duration-300 ${choices[sectionKey] ? 'bg-primary' : 'bg-muted'
                          }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mt-2 md:mt-3 text-xs text-muted-foreground">
              Complète les {displayCategories.length} étapes pour voir ton bilan
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-4 md:gap-8 max-w-6xl mx-auto">
            {/* Choices */}
            <div className="space-y-4 md:space-y-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {displayCategories.map((section) => {
                const IconComponent = iconMap[section.icon as keyof typeof iconMap] || Laptop;
                // Utiliser slug si disponible (API), sinon id (données locales)
                // IMPORTANT: Convertir l'ID en string si c'est un nombre
                const sectionKey = section.slug || String(section.id);
                const isComplete = !!choices[sectionKey];

                return (
                  <div
                    key={section.id}
                    className={`bg-card border-2 rounded-2xl p-4 md:p-6 shadow-building transition-all duration-300 ${isComplete
                        ? 'border-primary/30 shadow-building-hover'
                        : 'border-border hover:border-primary/20'
                      }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                      <div className={`p-2 md:p-2.5 rounded-lg transition-colors flex-shrink-0 ${isComplete ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
                        }`}>
                        <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <h2 className="font-heading font-bold text-lg md:text-xl text-foreground flex-1 min-w-0">
                        {section.title || section.name}
                      </h2>
                      <span className="text-xs font-medium px-2 md:px-3 py-1 rounded-full bg-muted text-muted-foreground whitespace-nowrap">
                        Étape {section.step || section.order}/{section.totalSteps || displayCategories.length}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs md:text-sm mb-4 md:mb-5 pl-0 md:pl-12">
                      {section.subtitle || ''}
                    </p>

                    <div className="grid gap-3 md:gap-4">
                      {section.options.map((option) => (
                        <ChoiceCard
                          key={option.id}
                          title={option.title || option.name}
                          description={option.description}
                          tags={option.tags || []}
                          isSelected={choices[sectionKey] === option.id}
                          onClick={() => setChoice(sectionKey, option.id)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar with Gauges */}
            <div className="lg:sticky lg:top-24 h-fit space-y-4 md:space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <GaugesPanel />

              <div className="p-4 md:p-5 bg-card rounded-xl border-2 border-border shadow-building">
                {allChoicesMade ? (
                  <>
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
                      <p className="text-sm font-medium text-foreground">
                        ✅ Simulation complète !
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 md:mb-4">
                      Tu as fait tous tes choix. Découvre maintenant le profil de ton lycée et reçois des conseils personnalisés.
                    </p>
                  </>
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                    Choisis une option dans chaque section ({Object.values(choices).filter(Boolean).length}/{displayCategories.length} complétées) pour débloquer ton bilan.
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
