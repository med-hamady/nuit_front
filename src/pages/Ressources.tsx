import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen, Users, Laptop, Cloud, Leaf, Shield, Recycle, Loader2 } from 'lucide-react';
import { EXTERNAL_LINKS, NIRD_PILLARS } from '@/data/constants';
import { RESOURCE_IDEAS } from '@/data/simulationContent';
import { getDjangoResources } from '@/services/djangoApi';
import { useState, useEffect } from 'react';
import type { ResourceResponse } from '@/types/api';

const resources = [
  {
    icon: <Laptop className="w-6 h-6" />,
    title: 'Pourquoi choisir Linux dans un établissement ?',
    description: 'Linux offre une alternative gratuite, sécurisée et durable. Découvrez comment des établissements ont fait ce choix avec succès.',
    link: 'https://www.reddit.com/r/linux/comments/zzcc15/why_are_you_using_linux/?tl=fr',
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: 'Réemploi & lutte contre l\'obsolescence',
    description: 'Un PC de 7 ans peut fonctionner encore 5+ ans avec Linux. Prolongez la vie de votre parc informatique et réduisez les déchets.',
    link: 'https://mytroc.pro/reemploi-definition-quest-ce-que-cest/',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Logiciels libres pour l\'éducation',
    description: 'LibreOffice, Nextcloud, Moodle... Une suite complète d\'outils gratuits, performants et respectueux de vos données.',
    link: 'https://www.gnu.org/education/edu-software.fr.html',
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: 'Souveraineté des données scolaires',
    description: 'Où sont stockées les données de vos élèves ? Comprenez les enjeux RGPD et découvrez les solutions souveraines disponibles.',
    link: 'https://www.unowhy.com/souverainete-numerique/',
  },
];

const nirdPillars = [
  {
    icon: <Users className="w-8 h-8" />,
    title: NIRD_PILLARS.inclusion.title,
    emoji: NIRD_PILLARS.inclusion.emoji,
    description: NIRD_PILLARS.inclusion.description,
    color: 'accent' as const,
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: NIRD_PILLARS.responsibility.title,
    emoji: NIRD_PILLARS.responsibility.emoji,
    description: NIRD_PILLARS.responsibility.description,
    color: 'primary' as const,
  },
  {
    icon: <Recycle className="w-8 h-8" />,
    title: NIRD_PILLARS.durability.title,
    emoji: NIRD_PILLARS.durability.emoji,
    description: NIRD_PILLARS.durability.description,
    color: 'secondary' as const,
  },
];

const Ressources = () => {
  const [apiResources, setApiResources] = useState<ResourceResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResources = async () => {
      try {
        setIsLoading(true);
        const response = await getDjangoResources();
        setApiResources(response.results || []);
      } catch (err) {
        console.error('Erreur lors du chargement des ressources:', err);
        setError('Impossible de charger les ressources. Utilisation des données par défaut.');
      } finally {
        setIsLoading(false);
      }
    };

    loadResources();
  }, []);

  // Utiliser les ressources de l'API si disponibles, sinon fallback vers les données locales
  const displayResources = apiResources.length > 0 ? apiResources.map(r => ({
    icon: r.type === 'video' ? <BookOpen className="w-6 h-6" /> :
          r.type === 'article' ? <Leaf className="w-6 h-6" /> :
          <Cloud className="w-6 h-6" />,
    title: r.title,
    description: r.description,
    link: r.url,
  })) : resources;

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Chargement des ressources...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6 md:py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {error && (
            <div className="mb-4 p-3 md:p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-xs md:text-sm">
              {error}
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-8 md:mb-12 animate-slide-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-2 md:mb-3">
              Ressources & Communauté NIRD
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              Tu veux aller plus loin dans ton établissement ? Voici quelques pistes pour passer à l'action concrètement.
            </p>
          </div>

          {/* Action Ideas */}
          <section className="mb-8 md:mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-4 md:mb-6">
              Passer à l'action dans ton lycée
            </h2>
            <div className="bg-card border-2 border-border rounded-2xl p-4 md:p-6 shadow-building">
              <ul className="space-y-3 md:space-y-4">
                {RESOURCE_IDEAS.map((idea, index) => (
                  <li key={index} className="flex items-start gap-2 md:gap-3 group">
                    <img src={idea.icon} alt="" className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 object-contain group-hover:scale-110 transition-transform" />
                    <span className="text-muted-foreground text-sm md:text-lg leading-relaxed">{idea.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* NIRD Pillars */}
          <section className="mb-8 md:mb-12 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-4 md:mb-6">
              Comprendre NIRD en 3 points
            </h2>
            <div className="grid md:grid-cols-3 gap-3 md:gap-4">
              {nirdPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className={`p-4 md:p-6 rounded-xl border-2 transition-all hover:shadow-building-hover hover:-translate-y-1 ${pillar.color === 'primary'
                      ? 'bg-primary/5 border-primary/20 text-primary'
                      : pillar.color === 'secondary'
                        ? 'bg-secondary/5 border-secondary/20 text-secondary'
                        : 'bg-accent/5 border-accent/20 text-accent'
                    }`}
                >
                  <div className="mb-2 md:mb-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                      {pillar.icon}
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-base md:text-lg mb-1.5 md:mb-2">{pillar.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Resources Links */}
          <section className="mb-8 md:mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-4 md:mb-6">
              Ressources & liens utiles
            </h2>
            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              {displayResources.map((resource, index) => (
                <div
                  key={index}
                  className="p-4 md:p-5 bg-card border-2 border-border rounded-xl hover:shadow-building-hover hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <div className="w-4 h-4 md:w-6 md:h-6 flex items-center justify-center">
                        {resource.icon}
                      </div>
                    </div>
                    <h3 className="font-heading font-bold text-sm md:text-base text-foreground">
                      {resource.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">{resource.description}</p>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium text-xs md:text-sm"
                  >
                    En savoir plus
                    <ExternalLink className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Community CTA */}
          <section className="bg-hero-gradient text-primary-foreground rounded-2xl p-6 md:p-10 text-center animate-slide-up shadow-village-lg" style={{ animationDelay: '0.25s' }}>
            <Users className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 opacity-90" />
            <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold mb-3 md:mb-4">
              Rejoignez la communauté NIRD
            </h3>
            <p className="mb-4 md:mb-6 opacity-90 max-w-xl mx-auto text-sm md:text-lg">
              Échangez avec d'autres établissements engagés, partagez vos expériences et bénéficiez de l'entraide collective pour un numérique plus responsable.
            </p>
            <a
              href={EXTERNAL_LINKS.nird}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="secondary"
                size="lg"
                className="gap-2 shadow-xl hover:shadow-2xl w-full sm:w-auto"
              >
                Visiter le site NIRD
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Ressources;
