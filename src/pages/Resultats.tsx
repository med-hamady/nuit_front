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
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8 animate-slide-up">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              Ton bilan de village numérique
            </h1>
            <p className="text-muted-foreground">
              Voici comment se porte ton lycée face aux Big Tech, en fonction des décisions que tu as prises.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Left Column: Profile & Radar */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {/* Profile Card */}
              <div
                className={`p-6 rounded-2xl border-2 ${profileData.variant === 'success'
                  ? 'bg-primary/5 border-primary/30'
                  : profileData.variant === 'warning'
                    ? 'bg-secondary/5 border-secondary/30'
                    : 'bg-destructive/5 border-destructive/30'
                  }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Leaf className={`w-8 h-8 ${profileData.variant === 'success' ? 'text-primary' :
                    profileData.variant === 'warning' ? 'text-secondary' : 'text-destructive'
                    }`} />
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    {profileData.title}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {profileData.description}
                </p>
              </div>

              {/* Radar Chart */}
              <div className="bg-card border border-border rounded-2xl p-2 shadow-village overflow-hidden">
                <h3 className="text-center text-sm font-bold text-muted-foreground mt-4 mb-2">
                  Empreinte de ton établissement
                </h3>
                <RadarChartProfile />
              </div>
            </div>

            {/* Right Column: Details & Actions */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {/* Badges Panel 🏆 */}
              <BadgesPanel />

              {/* Choice Analysis */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-heading font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Ce que disent tes choix
                </h3>
                <ul className="space-y-3">
                  {Object.entries(choices).map(([category, value]) => {
                    if (!value) return null;
                    const explanation = CHOICE_EXPLANATIONS[category as keyof typeof CHOICE_EXPLANATIONS]?.[value as string];
                    return (
                      <li key={category} className="text-muted-foreground text-sm leading-relaxed border-l-2 border-muted pl-3">
                        {explanation}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Items & Next Steps */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                Et maintenant, on fait quoi dans la vraie vie ?
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {ACTION_ITEMS.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-background/50 p-3 rounded-lg">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-muted-foreground text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  resetChoices();
                  navigate('/simulation');
                }}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Rejouer avec d'autres choix
              </Button>
              <Button
                variant="hero"
                size="lg"
                onClick={() => navigate('/ressources')}
                className="gap-2 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Voir les ressources NIRD
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resultats;
