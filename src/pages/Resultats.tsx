import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { GaugesPanel } from '@/components/GaugesPanel';
import { RadarChartProfile } from '@/components/RadarChartProfile';
import { Button } from '@/components/ui/button';
import { useVillage } from '@/contexts/VillageContext';
import { ArrowLeft, ArrowRight, RefreshCw, Leaf, AlertTriangle, Trophy } from 'lucide-react';
import { CHOICE_EXPLANATIONS, ACTION_ITEMS, ACHIEVEMENT_BADGES } from '@/data/simulationContent';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { submitSimulationRun, getCategories } from '@/services/djangoApi';
import type { Category } from '@/types/api';

const profileMessages = {
  resistant: {
    title: 'Ton lycée est très résistant',
    description: 'Bravo ! Tes choix montrent un engagement fort vers un numérique inclusif, responsable et durable. Ton village est sur la bonne voie pour une vraie autonomie numérique.',
    variant: 'success' as const,
  },
  transition: {
    title: 'Ton lycée est en bonne transition',
    description: 'Tu as fait des choix équilibrés. Certains aspects sont déjà résistants, d\'autres peuvent encore progresser. Continue sur cette lancée !',
    variant: 'warning' as const,
  },
  dependent: {
    title: 'Ton lycée reste très dépendant des Big Tech',
    description: 'Tes choix maintiennent une forte dépendance aux solutions propriétaires. C\'est l\'occasion de découvrir des alternatives plus autonomes et durables.',
    variant: 'danger' as const,
  },
};

const Resultats = () => {
  const navigate = useNavigate();
  const { choices, gauges, getProfile, resetChoices, allChoicesMade } = useVillage();
  const profile = getProfile();
  const profileData = profileMessages[profile];
  const [isSaved, setIsSaved] = useState(false);

  // Sauvegarder la simulation dans l'API
  useEffect(() => {
    const saveSimulation = async () => {
      if (!allChoicesMade || isSaved) return;

      try {
        // Charger les catégories pour mapper les choix aux IDs
        const categoriesData = await getCategories();
        const choicesWithIds: Record<string, number> = {};

        // Convertir les choix en IDs d'options
        Object.entries(choices).forEach(([categorySlug, choiceValue]) => {
          if (!choiceValue) return;

          const category = categoriesData.categories.find(c => c.slug === categorySlug);
          if (!category) return;

          // choiceValue est déjà un ID numérique
          const option = category.options.find(opt => opt.id === choiceValue);

          if (option) {
            choicesWithIds[categorySlug] = option.id;
          }
        });

        // Envoyer les résultats à l'API
        await submitSimulationRun({
          score_cost: gauges.cost,
          score_ecology: gauges.ecology,
          score_autonomy: gauges.autonomy,
          score_inclusion: gauges.inclusion,
          choices: choicesWithIds,
          profile: profile,
        });

        setIsSaved(true);
        console.log('Simulation sauvegardée avec succès');
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de la simulation:', error);
        // Continue silencieusement - l'utilisateur peut toujours voir ses résultats
      }
    };

    saveSimulation();
  }, [allChoicesMade, choices, gauges, profile, isSaved]);

  // Effet Confetti 🎉
  useEffect(() => {
    if (allChoicesMade && profile === 'resistant') {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [allChoicesMade, profile]);

  if (!allChoicesMade) {
    return (
      <Layout>
        <div className="py-16 text-center">
          <div className="container mx-auto px-4 max-w-lg">
            <AlertTriangle className="w-16 h-16 text-secondary mx-auto mb-4" />
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
              Simulation incomplète
            </h1>
            <p className="text-muted-foreground mb-6">
              Tu n'as pas encore fait tous tes choix. Retourne à la simulation pour compléter ton parcours.
            </p>
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate('/simulation')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Aller à la simulation
            </Button>
          </div>
        </div>
      </Layout>
    );
  }


  // Mapper les IDs d'options aux noms pour les badges
  const getBadgeKeyFromOptionId = (categorySlug: string, optionId: number): string | null => {
    // Mapping basé sur les données de l'API
    // Option 2 (Linux) -> 'linux', Option 4 (LibreOffice) -> 'libreoffice', etc.
    const badgeMapping: Record<string, Record<number, string>> = {
      '1': { 2: 'linux', 1: 'windows' },           // Catégorie 1: Système d'exploitation
      '2': { 4: 'libreoffice', 3: 'microsoft' },   // Catégorie 2: Suite bureautique
      '3': { 6: 'european', 5: 'bigtech' },        // Catégorie 3: Stockage
      '4': { 8: 'reuse', 7: 'replace' },           // Catégorie 4: Matériel (mapped to renewal)
      '5': { 9: 'reuse', 10: 'replace' },          // Catégorie 5: Réutilisation
    };

    return badgeMapping[categorySlug]?.[optionId] || null;
  };

  // Mapper les slugs de catégories aux clés de badges
  const getCategoryBadgeKey = (categorySlug: string): keyof typeof ACHIEVEMENT_BADGES | null => {
    const categoryMapping: Record<string, keyof typeof ACHIEVEMENT_BADGES> = {
      '1': 'os',
      '2': 'office',
      '3': 'storage',
      '4': 'renewal',
      '5': 'renewal',
    };
    return categoryMapping[categorySlug] || null;
  };

  // Collecter les badges débloqués
  const unlockedBadges = Object.entries(choices)
    .map(([categorySlug, optionId]) => {
      if (!optionId) return null;

      const badgeCategoryKey = getCategoryBadgeKey(categorySlug);
      if (!badgeCategoryKey) return null;

      const badgeKey = getBadgeKeyFromOptionId(categorySlug, optionId);
      if (!badgeKey) return null;

      const categoryBadges = ACHIEVEMENT_BADGES[badgeCategoryKey];
      if (!categoryBadges) return null;

      return categoryBadges[badgeKey as keyof typeof categoryBadges];
    })
    .filter(Boolean);

  return (
    <Layout>
      <div className="py-8 md:py-12 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-10 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Ton bilan de village numérique
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Voici comment se porte ton lycée face aux Big Tech, en fonction des décisions que tu as prises.
            </p>
          </div>

          {/* Hero Profile Card - Full Width */}
          <div className="max-w-5xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.05s' }}>
            <div
              className={`p-8 rounded-3xl border-2 shadow-2xl transition-all duration-500 ${
                profileData.variant === 'success'
                  ? 'bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/40 shadow-primary/20'
                  : profileData.variant === 'warning'
                    ? 'bg-gradient-to-br from-secondary/10 via-secondary/5 to-background border-secondary/40 shadow-secondary/20'
                    : 'bg-gradient-to-br from-destructive/10 via-destructive/5 to-background border-destructive/40 shadow-destructive/20'
              }`}
            >
              <div className="flex items-center gap-6">
                <div
                  className={`p-6 rounded-2xl ${
                    profileData.variant === 'success'
                      ? 'bg-primary/20'
                      : profileData.variant === 'warning'
                        ? 'bg-secondary/20'
                        : 'bg-destructive/20'
                  }`}
                >
                  <Leaf
                    className={`w-12 h-12 ${
                      profileData.variant === 'success'
                        ? 'text-primary'
                        : profileData.variant === 'warning'
                          ? 'text-secondary'
                          : 'text-destructive'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                    {profileData.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {profileData.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid Layout */}
          <div className="grid lg:grid-cols-[350px_1fr] gap-8 mb-10 max-w-7xl mx-auto">
            {/* Left Column - Sidebar */}
            <div className="space-y-8">
              {/* Gauges Panel */}
              <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="bg-card border-2 border-border rounded-3xl p-6 shadow-xl">
                  <GaugesPanel />
                </div>
              </div>

              {/* Badges Panel */}
              <div className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
                <div className="bg-card border-2 border-border rounded-3xl p-6 shadow-xl">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Tes Succès ({unlockedBadges.length}/4)
                  </h3>

                  <div className="space-y-3">
                    {unlockedBadges.map((badge: any) => (
                      <div
                        key={badge.id}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02]",
                          badge.color === 'primary' && "bg-primary/5 border-primary/30",
                          badge.color === 'secondary' && "bg-secondary/5 border-secondary/30",
                          badge.color === 'accent' && "bg-accent/5 border-accent/30"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={badge.icon}
                            alt={badge.title}
                            className="w-10 h-10 flex-shrink-0 object-contain"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-heading font-bold text-sm text-foreground mb-1">
                              {badge.title}
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {badge.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {unlockedBadges.length === 4 && (
                    <div className="mt-4 p-3 bg-primary/10 rounded-xl text-center border border-primary/20">
                      <span className="text-primary font-bold text-sm">
                        Félicitations ! Tous les succès débloqués !
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Main Content */}
            <div className="space-y-8">
              {/* Radar Chart */}
              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="bg-card border-2 border-border rounded-3xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-heading font-bold text-xl text-foreground flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                      Empreinte de ton établissement
                    </h3>
                    <div className="px-4 py-2 bg-primary/10 rounded-full">
                      <span className="text-primary font-bold text-sm">Analyse visuelle</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-2xl p-4">
                    <RadarChartProfile />
                  </div>
                </div>
              </div>

              {/* Choice Analysis */}
              <div className="animate-slide-up" style={{ animationDelay: '0.25s' }}>
                <div className="bg-card border-2 border-border rounded-3xl p-6 shadow-xl">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <img src="/check-mark.png" alt="Check" className="w-5 h-5" />
                    </div>
                    Ce que disent tes choix
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(choices).map(([categorySlug, optionId]) => {
                      if (!optionId) return null;

                      // Mapper les IDs de catégorie et d'option aux clés d'explication
                      const badgeCategoryKey = getCategoryBadgeKey(categorySlug);
                      if (!badgeCategoryKey) return null;

                      const badgeKey = getBadgeKeyFromOptionId(categorySlug, optionId);
                      if (!badgeKey) return null;

                      const explanation = CHOICE_EXPLANATIONS[badgeCategoryKey as keyof typeof CHOICE_EXPLANATIONS]?.[badgeKey];
                      if (!explanation) return null;

                      return (
                        <div
                          key={categorySlug}
                          className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20 hover:border-primary/40 transition-all"
                        >
                          <img src="/check-mark.png" alt="Check" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <p className="text-foreground text-sm leading-relaxed">
                            {explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Items & Next Steps - Full Width */}
          <div className="max-w-5xl mx-auto">
            <div
              className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/30 rounded-3xl p-8 mb-8 shadow-xl animate-slide-up"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary rounded-xl">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-foreground">
                  Et maintenant, on fait quoi dans la vraie vie ?
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {ACTION_ITEMS.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white/60 dark:bg-background/60 p-4 rounded-xl border border-primary/10 hover:border-primary/30 transition-all hover:shadow-md"
                  >
                    <img src={item.icon} alt="" className="w-6 h-6 flex-shrink-0 object-contain" />
                    <span className="text-foreground font-medium text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.35s' }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  resetChoices();
                  navigate('/simulation');
                }}
                className="gap-2 text-lg px-8 py-6 border-2 hover:border-primary hover:bg-primary/5 transition-all"
              >
                <RefreshCw className="w-5 h-5" />
                Rejouer avec d'autres choix
              </Button>
              <Button
                variant="hero"
                size="lg"
                onClick={() => navigate('/ressources')}
                className="gap-2 text-lg px-8 py-6 shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all bg-gradient-to-r from-primary to-primary/80"
              >
                Voir les ressources NIRD
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resultats;
