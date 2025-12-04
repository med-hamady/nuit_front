import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Lightbulb, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { submitIdea } from '@/services/djangoApi';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export function IdeaForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author_name: '',
    school_name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await submitIdea(formData);

      toast.success('Idée envoyée !', {
        description: 'Merci pour ta contribution ! Elle sera examinée par notre équipe.',
      });

      setIsSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          author_name: '',
          school_name: '',
        });
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      toast.error('Erreur', {
        description: 'Une erreur est survenue lors de l\'envoi. Réessaie plus tard.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="glass border-2 border-accent/40 rounded-2xl p-8 text-center relative overflow-hidden"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-32 h-32 bg-accent rounded-full blur-3xl"
          />
        </div>

        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative z-10"
        >
          <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
        </motion.div>
        <h3 className="text-2xl font-heading font-bold text-accent mb-2 relative z-10">
          Merci pour ton idée !
        </h3>
        <p className="text-muted-foreground relative z-10">
          Elle sera bientôt ajoutée à la communauté NIRD.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass border-2 border-primary/20 rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-32 h-32 bg-primary rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-3 mb-6 relative z-10"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="p-2 glass-dark rounded-lg border border-primary/20"
        >
          <Lightbulb className="w-6 h-6 text-primary" />
        </motion.div>
        <div>
          <h3 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
            Propose une idée
            <Sparkles className="w-4 h-4 text-primary animate-pulse-slow" />
          </h3>
          <p className="text-sm text-muted-foreground">
            Partage tes idées pour rendre ton établissement plus résistant
          </p>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Label htmlFor="title" className="required">
            Titre de l'idée *
          </Label>
          <Input
            id="title"
            required
            placeholder="Ex: Créer un club Linux"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            disabled={isSubmitting}
            maxLength={100}
            className="glass-dark border-2 border-primary/20 focus:border-primary/50 transition-all"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {formData.title.length}/100 caractères
          </p>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Label htmlFor="description" className="required">
            Description *
          </Label>
          <Textarea
            id="description"
            required
            placeholder="Décris ton idée en quelques phrases..."
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            disabled={isSubmitting}
            rows={4}
            maxLength={500}
            className="glass-dark border-2 border-primary/20 focus:border-primary/50 transition-all resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {formData.description.length}/500 caractères
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Label htmlFor="author_name">
              Ton nom (optionnel)
            </Label>
            <Input
              id="author_name"
              placeholder="Ex: Marie Dupont"
              value={formData.author_name}
              onChange={(e) => handleChange('author_name', e.target.value)}
              disabled={isSubmitting}
              className="glass-dark border-2 border-primary/20 focus:border-primary/50 transition-all"
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Label htmlFor="school_name">
              Ton établissement (optionnel)
            </Label>
            <Input
              id="school_name"
              placeholder="Ex: Lycée Victor Hugo, Paris"
              value={formData.school_name}
              onChange={(e) => handleChange('school_name', e.target.value)}
              disabled={isSubmitting}
              className="glass-dark border-2 border-primary/20 focus:border-primary/50 transition-all"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-dark rounded-lg p-4 border border-primary/20"
        >
          <p className="text-xs text-muted-foreground flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <strong>Astuce :</strong> Les meilleures idées sont celles qui sont concrètes et réalisables.
              Pense à des actions simples que tu pourrais mettre en place dans ton lycée.
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full gap-2 hover-glow"
            disabled={isSubmitting || !formData.title || !formData.description}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Envoyer mon idée
              </>
            )}
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-muted-foreground text-center"
        >
          Ton idée sera examinée avant d'être publiée dans la communauté.
        </motion.p>
      </form>
    </motion.div>
  );
}
