import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { IdeaForm } from '@/components/IdeaForm';
import { getIdeas } from '@/services/djangoApi';
import { Lightbulb, Calendar, User, School, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { IdeaResponse } from '@/types/api';

const Ideas = () => {
  const [communityIdeas, setCommunityIdeas] = useState<IdeaResponse[]>([]);
  const [myIdeas, setMyIdeas] = useState<IdeaResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les idées de la communauté (approuvées)
  useEffect(() => {
    const fetchCommunityIdeas = async () => {
      try {
        setIsLoading(true);
        const response = await getIdeas(true); // approved=true
        setCommunityIdeas(response.results || []);
      } catch (error) {
        console.error('Erreur lors du chargement des idées:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunityIdeas();
  }, []);

  // Charger les idées soumises par l'utilisateur depuis localStorage
  useEffect(() => {
    const savedIdeas = localStorage.getItem('my_ideas');
    if (savedIdeas) {
      try {
        const ideas = JSON.parse(savedIdeas);
        setMyIdeas(ideas);
      } catch (error) {
        console.error('Erreur lors du chargement des idées locales:', error);
      }
    }
  }, []);

  // Callback quand une nouvelle idée est soumise
  const handleIdeaSubmitted = (idea: IdeaResponse) => {
    // Ajouter l'idée aux idées de l'utilisateur
    const updatedMyIdeas = [idea, ...myIdeas];
    setMyIdeas(updatedMyIdeas);

    // Sauvegarder dans localStorage
    localStorage.setItem('my_ideas', JSON.stringify(updatedMyIdeas));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Layout>
      <div className="py-6 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12 animate-slide-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground">
                Idées de la communauté
              </h1>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Partage tes idées pour rendre ton établissement plus résistant et découvre celles des autres membres de la communauté NIRD.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* Colonne principale - Idées de la communauté */}
            <div className="space-y-6 md:space-y-8">
              {/* Mes idées soumises */}
              {myIdeas.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground flex items-center gap-2">
                    <User className="w-5 h-5 text-accent" />
                    Mes idées soumises ({myIdeas.length})
                  </h2>
                  <div className="grid gap-4">
                    {myIdeas.map((idea, index) => (
                      <IdeaCard key={idea.id || index} idea={idea} isPending />
                    ))}
                  </div>
                  <div className="border-t-2 border-border my-6 md:my-8" />
                </motion.div>
              )}

              {/* Idées approuvées de la communauté */}
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Idées approuvées par la communauté
                </h2>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground">Chargement des idées...</p>
                  </div>
                ) : communityIdeas.length === 0 ? (
                  <div className="bg-card border-2 border-border rounded-2xl p-8 text-center">
                    <Lightbulb className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">
                      Aucune idée approuvée pour le moment. Sois le premier à en proposer une !
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {communityIdeas.map((idea, index) => (
                      <IdeaCard key={idea.id || index} idea={idea} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Formulaire */}
            <div className="lg:sticky lg:top-24 h-fit">
              <IdeaForm onSuccess={handleIdeaSubmitted} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Composant pour afficher une idée
function IdeaCard({ idea, isPending = false }: { idea: IdeaResponse; isPending?: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`bg-card border-2 rounded-2xl p-4 md:p-6 shadow-building transition-all hover:shadow-building-hover ${
        isPending ? 'border-accent/40 bg-accent/5' : 'border-primary/20'
      }`}
    >
      {isPending && (
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium mb-3">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          En attente d'approbation
        </div>
      )}

      <h3 className="font-heading font-bold text-lg md:text-xl text-foreground mb-2 flex items-start gap-2">
        <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
        {idea.title}
      </h3>

      <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
        {idea.description}
      </p>

      <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
        {idea.author_name && idea.author_name !== 'Anonyme' && (
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>{idea.author_name}</span>
          </div>
        )}

        {idea.school_name && idea.school_name !== 'Non spécifié' && (
          <div className="flex items-center gap-1.5">
            <School className="w-4 h-4" />
            <span>{idea.school_name}</span>
          </div>
        )}

        {idea.created_at && (
          <div className="flex items-center gap-1.5 ml-auto">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(idea.created_at)}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default Ideas;
