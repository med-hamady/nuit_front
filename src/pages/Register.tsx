import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
    telephone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirm) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas',
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Le mot de passe doit contenir au moins 6 caractères',
      });
      return;
    }

    setIsLoading(true);

    try {
      await register(formData);
      toast({
        title: 'Inscription réussie',
        description: 'Bienvenue sur Mon Lycée Résistant!',
      });
      navigate('/');
    } catch (error) {
      console.error('Erreur complète:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur d\'inscription',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-heading font-bold text-foreground">
              Créer un compte
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Ou{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                se connecter à un compte existant
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-foreground mb-2">
                    Prénom
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Prénom"
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-foreground mb-2">
                    Nom
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Nom"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                  Nom d'utilisateur *
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Nom d'utilisateur"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Email"
                />
              </div>

              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-foreground mb-2">
                  Téléphone *
                </label>
                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  required
                  value={formData.telephone}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="0123456789"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Mot de passe * (min. 6 caractères)
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Mot de passe"
                />
              </div>

              <div>
                <label htmlFor="password_confirm" className="block text-sm font-medium text-foreground mb-2">
                  Confirmer le mot de passe *
                </label>
                <input
                  id="password_confirm"
                  name="password_confirm"
                  type="password"
                  required
                  value={formData.password_confirm}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Confirmer le mot de passe"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
