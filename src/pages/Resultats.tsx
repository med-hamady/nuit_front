import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { GaugesPanel } from '@/components/GaugesPanel';
import { RadarChartProfile } from '@/components/RadarChartProfile';
import { BadgesPanel } from '@/components/BadgesPanel';
import { Button } from '@/components/ui/button';
import { useVillage } from '@/contexts/VillageContext';
import { ArrowLeft, ArrowRight, RefreshCw, Leaf, CheckCircle2, AlertTriangle } from 'lucide-react';
import { CHOICE_EXPLANATIONS, ACTION_ITEMS } from '@/data/simulationContent';
import confetti from 'canvas-confetti';

const profileMessages = {
  resistant: {
    title: 'Ton lycée est très résistant 🌱',
    description: 'Bravo ! Tes choix montrent un engagement fort vers un numérique inclusif, responsable et durable. Ton village est sur la bonne voie pour une vraie autonomie numérique.',
    variant: 'success' as const,
  },
  transition: {
    title: 'Ton lycée est en bonne transition ✨',
    description: 'Tu as fait des choix équilibrés. Certains aspects sont déjà résistants, d\'autres peuvent encore progresser. Continue sur cette lancée !',
    variant: 'warning' as const,
  },
  dependent: {
    title: 'Ton lycée reste très dépendant des Big Tech 😬',
    description: 'Tes choix maintiennent une forte dépendance aux solutions propriétaires. C\'est l\'occasion de découvrir des alternatives plus autonomes et durables.',
    variant: 'danger' as const,
  },
};

const Resultats = () => {
  const navigate = useNavigate();
  const { choices, getProfile, resetChoices, allChoicesMade } = useVillage();
  const profile = getProfile();
  const profileData = profileMessages[profile];

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

  return (
    <Layout>
      <div className="py-8 md:py-12 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Ton bilan de village numérique
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Voici comment se porte ton lycée face aux Big Tech, en fonction des décisions que tu as prises.
            </p>
          </div>

          {/* Hero Profile Card - Full Width */}
          <div className="max-w-4xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div
              className={`p-8 rounded-3xl border-2 shadow-2xl transition-all duration-500 ${
                profileData.variant === 'success'
                  ? 'bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/40 shadow-primary/20'
                  : profileData.variant === 'warning'
                    ? 'bg-gradient-to-br from-secondary/10 via-secondary/5 to-background border-secondary/40 shadow-secondary/20'
                    : 'bg-gradient-to-br from-destructive/10 via-destructive/5 to-background border-destructive/40 shadow-destructive/20'
              }`}
            >
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
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
                    className={`w-16 h-16 ${
                      profileData.variant === 'success'
                        ? 'text-primary'
                        : profileData.variant === 'warning'
                          ? 'text-secondary'
                          : 'text-destructive'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                    {profileData.title}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {profileData.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Section - 3 Column Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
            {/* Radar Chart - Larger Focus */}
            <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-card border-2 border-border rounded-3xl p-6 shadow-xl h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-2xl text-foreground flex items-center gap-3">
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

            {/* Gauges Panel - Sidebar */}
            <div className="animate-slide-up" style={{ animationDelay: '0.25s' }}>
              <GaugesPanel />
            </div>
          </div>

          {/* Badges & Analysis Section - 2 Column Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12 max-w-7xl mx-auto">
            {/* Badges Panel */}
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <BadgesPanel />
            </div>

            {/* Choice Analysis */}
            <div className="animate-slide-up" style={{ animationDelay: '0.35s' }}>
              <div className="bg-card border-2 border-border rounded-3xl p-6 shadow-xl h-full">
                <h3 className="font-heading font-bold text-2xl text-foreground mb-6 flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  Ce que disent tes choix
                </h3>
                <ul className="space-y-4">
                  {Object.entries(choices).map(([category, value]) => {
                    if (!value) return null;
                    const explanation = CHOICE_EXPLANATIONS[category as keyof typeof CHOICE_EXPLANATIONS]?.[value as string];
                    return (
                      <li
                        key={category}
                        className="text-muted-foreground leading-relaxed pl-4 border-l-4 border-primary/30 hover:border-primary/60 transition-colors py-2"
                      >
                        {explanation}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Items & Next Steps - Full Width */}
          <div className="max-w-5xl mx-auto">
            <div
              className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/30 rounded-3xl p-8 mb-10 shadow-xl animate-slide-up"
              style={{ animationDelay: '0.4s' }}
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
                    className="flex items-start gap-4 bg-white/60 dark:bg-background/60 p-4 rounded-xl border border-primary/10 hover:border-primary/30 transition-all hover:shadow-md"
                  >
                    <span className="text-3xl flex-shrink-0">{item.icon}</span>
                    <span className="text-foreground font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.45s' }}>
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
