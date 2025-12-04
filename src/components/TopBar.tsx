import { EXTERNAL_LINKS } from '@/data/constants';
import { Github, Moon, ExternalLink } from 'lucide-react';

export const TopBar = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 shadow-sm relative z-50">
      <div className="container mx-auto flex justify-between items-center text-xs md:text-sm font-medium">

        {/* Left side: Nuit de l'Info context */}
        <div className="flex items-center gap-2 md:gap-4">
          <a
            href={EXTERNAL_LINKS.nuitInfo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 md:gap-2 opacity-90 hover:opacity-100 transition-opacity"
          >
            <Moon className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="hidden sm:inline">Nuit de l'Info 2025</span>
            <span className="sm:hidden">NdI 2025</span>
          </a>

          <div className="hidden md:block h-3 w-px bg-primary-foreground/30" />

          <span className="hidden md:flex opacity-80 items-center gap-1.5">
            <span>Thème :</span>
            <span className="font-bold text-white">L'humain au cœur du numérique</span>
          </span>
        </div>

        {/* Right side: External Links */}
        <div className="flex items-center gap-2 md:gap-4">
          <a
            href={EXTERNAL_LINKS.nird}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 opacity-80 hover:opacity-100 hover:text-white transition-all group"
          >
            <span>NIRD</span>
            <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>

          <a
            href={EXTERNAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 md:gap-2 bg-black/20 hover:bg-black/30 px-2 md:px-3 py-1 rounded-full transition-all hover:scale-105"
          >
            <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden md:inline">GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};
