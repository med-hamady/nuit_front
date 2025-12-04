import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { ArrowRight, ArrowDown, Shield, Leaf, Users, Laptop } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const scrollToContext = () => {
    document.getElementById('context')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            {/* Left column - Text */}
            <div className="animate-slide-up">
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                Bienvenue dans le
                <span className="block text-primary">Village Numérique Résistant</span>
              </h1>
              
              <div className="space-y-4 text-muted-foreground mb-8">
                <p className="text-lg">
                  <strong className="text-foreground">Le problème :</strong> dépendance aux Big Tech, obsolescence programmée, coûts importants, données hors de contrôle.
                </p>
                <p className="text-lg">
                  <strong className="text-foreground">La solution :</strong> démarche NIRD, réemploi, logiciels libres, solutions locales et souveraines.
                </p>
              </div>

              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 mb-8">
                <p className="text-foreground font-medium mb-2">
                  🎓 Tu es chef d'établissement.
                </p>
                <p className="text-muted-foreground text-sm">
                  Tes décisions numériques influencent les coûts, l'écologie, l'autonomie et l'inclusion. Inspiré par NIRD, ce jeu te montre comment ton lycée peut devenir un village résistant.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  variant="hero"
                  size="xl"
                  onClick={() => navigate('/simulation')}
                  className="group"
                >
                  Commencer l'aventure
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToContext}
                  className="gap-2"
                >
                  Comprendre le contexte
                  <ArrowDown className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Right column - Illustration */}
            <div className="relative animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 shadow-village-lg">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-5xl">🏫</span>
                  <div className="bg-primary/10 rounded-xl p-4 flex-1">
                    <p className="text-primary font-heading font-bold text-lg">
                      "Mon lycée devient un village numérique résistant !"
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Réemploi', 'Logiciels libres', 'Données souveraines', 'Sobriété', 'Autonomie'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section id="context" className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Comprendre le contexte
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Problem Card */}
              <div className="p-6 bg-destructive/5 border-2 border-destructive/20 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <Shield className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    Le problème : dépendance aux Big Tech
                  </h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span><strong>Obsolescence Windows 10</strong> → PC jetés alors qu'ils fonctionnent encore</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span><strong>Licences et abonnements</strong> qui coûtent cher chaque année</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span><strong>Données des élèves</strong> hébergées très loin, dans des services fermés</span>
                  </li>
                </ul>
              </div>

              {/* Solution Card */}
              <div className="p-6 bg-primary/5 border-2 border-primary/20 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Leaf className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    Une autre voie avec NIRD
                  </h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong>Réemploi et reconditionnement</strong> d'ordinateurs existants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Adoption de <strong>GNU/Linux et logiciels libres</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong>Solutions locales</strong>, sobres et durables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Redonner du <strong>pouvoir d'agir</strong> aux équipes et élèves</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Values */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              <ValueCard
                icon={<Users className="w-6 h-6" />}
                title="Inclusif"
                description="Accès au numérique pour tous, réduction de la fracture"
                color="accent"
              />
              <ValueCard
                icon={<Shield className="w-6 h-6" />}
                title="Responsable"
                description="Maîtrise des données, autonomie, logiciels libres"
                color="primary"
              />
              <ValueCard
                icon={<Laptop className="w-6 h-6" />}
                title="Durable"
                description="Réemploi, sobriété numérique, lutte contre l'obsolescence"
                color="secondary"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

function ValueCard({ 
  icon, 
  title, 
  description, 
  color 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: 'primary' | 'secondary' | 'accent';
}) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
  };

  return (
    <div className={`p-5 rounded-xl border-2 ${colorClasses[color]}`}>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="font-heading font-bold text-lg">{title}</h3>
      </div>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
}

export default Index;
