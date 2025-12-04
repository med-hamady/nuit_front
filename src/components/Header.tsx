import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BRANDING } from '@/data/constants';

const navItems = [
  { label: 'Accueil', path: '/' },
  { label: 'Simulation', path: '/simulation' },
  { label: 'Résultats', path: '/resultats' },
  { label: 'Ressources', path: '/ressources' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Title */}
        <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">{BRANDING.emoji}</span>
          <div className="hidden sm:block">
            <h1 className="font-heading font-bold text-foreground leading-tight">
              {BRANDING.appName}
            </h1>
            <p className="text-xs text-muted-foreground">
              {BRANDING.appSubtitle}
            </p>
          </div>
        </NavLink>

        {/* Navigation */}
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
      </div>
    </header>
  );
}
