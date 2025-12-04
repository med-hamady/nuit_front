import { ExternalLink } from 'lucide-react';
import { EXTERNAL_LINKS, BRANDING } from '@/data/constants';

export function Footer() {
  return (
    <footer className="py-8 bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-3">
          {/* Main message */}
          <p className="text-muted-foreground text-sm">
            Projet créé pour la{' '}
            <a
              href={EXTERNAL_LINKS.nuitInfo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              Nuit de l'Info 2025
              <ExternalLink className="w-3 h-3" />
            </a>
            {' '}— Inspiré par la démarche{' '}
            <a
              href={EXTERNAL_LINKS.nird}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              NIRD
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>

          {/* Team branding */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="h-px w-8 bg-border" />
            <p className="text-xs text-muted-foreground font-medium">
              Une réalisation de l'équipe{' '}
              <span className="text-primary font-bold">{BRANDING.teamName}</span>
            </p>
            <div className="h-px w-8 bg-border" />
          </div>

          {/* Additional info */}
          <p className="text-xs text-muted-foreground/70">
            Application conçue pour être performante, pédagogique et alignée avec les valeurs NIRD
          </p>
        </div>
      </div>
    </footer>
  );
}
