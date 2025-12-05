import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BRANDING, EXTERNAL_LINKS } from '@/data/constants';
import { Menu, X, MoreVertical, Github, Moon, ExternalLink, User, LogOut, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { label: 'Accueil', path: '/' },
  { label: 'Simulation', path: '/simulation' },
  { label: 'Quiz', path: '/quiz' },
  { label: 'Résultats', path: '/resultats' },
  { label: 'Ressources', path: '/ressources' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Title */}
        <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/Mon_Lycee_Reeistant.png" alt="Logo" className="w-8 h-8 object-contain" />
          <div className="hidden sm:block">
            <h1 className="font-heading font-bold text-foreground leading-tight">
              {BRANDING.appName}
            </h1>
            <p className="text-xs text-muted-foreground">
              {BRANDING.appSubtitle}
            </p>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 md:gap-2">
          <nav className="flex items-center gap-1 md:gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Menu"
            >
              <MoreVertical className="w-5 h-5 text-foreground" />
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg py-2 z-20">
                  {isAuthenticated && user && (
                    <>
                      <div className="px-4 py-2 border-b border-border">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{user.username}</span>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Déconnexion</span>
                      </button>
                      <div className="border-t border-border my-1" />
                    </>
                  )}

                  {!isAuthenticated && (
                    <>
                      <button
                        onClick={() => {
                          navigate('/login');
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors w-full text-left"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Connexion</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate('/register');
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors w-full text-left"
                      >
                        <User className="w-4 h-4" />
                        <span>Inscription</span>
                      </button>
                      <div className="border-t border-border my-1" />
                    </>
                  )}

                  <a
                    href={EXTERNAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>
                  <a
                    href={EXTERNAL_LINKS.nird}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>NIRD</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>
                  <a
                    href={EXTERNAL_LINKS.nuitInfo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Moon className="w-4 h-4" />
                    <span>Nuit de l'Info</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="border-t border-border my-2" />

            {isAuthenticated && user && (
              <>
                <div className="px-4 py-2 border border-border rounded-lg mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{user.username}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all w-full text-left"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Connexion</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/register');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all w-full text-left"
                >
                  <User className="w-4 h-4" />
                  <span>Inscription</span>
                </button>
              </>
            )}

            <div className="border-t border-border my-2" />

            <a
              href={EXTERNAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
            </a>
            <a
              href={EXTERNAL_LINKS.nird}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <ExternalLink className="w-4 h-4" />
              <span>NIRD</span>
              <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
            </a>
            <a
              href={EXTERNAL_LINKS.nuitInfo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <Moon className="w-4 h-4" />
              <span>Nuit de l'Info</span>
              <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
