/**
 * Constants & External Links
 * Centralized configuration for all external URLs and branding
 */

export const EXTERNAL_LINKS = {
  github: 'https://github.com/Hadrami41/village-num-rique-libre',
  nuitInfo: 'https://www.nuitdelinfo.com',
  nird: 'https://nird.forge.apps.education.fr',
} as const;

export const BRANDING = {
  appName: 'Mon Lycée Résistant',
  appSubtitle: 'Village Numérique inspiré par NIRD',
  teamName: 'Layer3_Squad',
  emoji: '🏫',
} as const;

export const NIRD_PILLARS = {
  inclusion: {
    title: 'Inclusion',
    emoji: '👥',
    description: 'Donner accès au numérique à tous les élèves, réduire la fracture numérique, équiper sans discriminer.',
  },
  responsibility: {
    title: 'Responsabilité',
    emoji: '🔓',
    description: 'Maîtriser ses données, choisir des logiciels libres, garder le contrôle sur les outils pédagogiques.',
  },
  durability: {
    title: 'Durabilité',
    emoji: '🌍',
    description: 'Lutter contre l\'obsolescence, réemployer le matériel, réduire l\'empreinte écologique du numérique.',
  },
} as const;
