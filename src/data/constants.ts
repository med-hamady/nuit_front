/**
 * Constants & External Links
 * Centralized configuration for all external URLs and branding
 */

export const EXTERNAL_LINKS = {
  github: 'https://github.com/med-hamady/nuit_front',
  nuitInfo: 'https://www.nuitdelinfo.com',
  nird: 'https://nird.forge.apps.education.fr',
} as const;

export const BRANDING = {
  appName: 'Mon Lycée Résistant',
  appSubtitle: 'Village Numérique inspiré par NIRD',
  teamName: 'Layer3_Squad',
  icon: '/Mon_Lycee_Reeistant.png',
} as const;

export const NIRD_PILLARS = {
  inclusion: {
    title: 'Inclusion',
    emoji: '/inclusion.png',
    description: 'Donner accès au numérique à tous les élèves, réduire la fracture numérique, équiper sans discriminer.',
  },
  responsibility: {
    title: 'Responsabilité',
    emoji: '/autonomie_numerique.png',
    description: 'Maîtriser ses données, choisir des logiciels libres, garder le contrôle sur les outils pédagogiques.',
  },
  durability: {
    title: 'Durabilité',
    emoji: '/Impact_ecologique.png',
    description: 'Lutter contre l\'obsolescence, réemployer le matériel, réduire l\'empreinte écologique du numérique.',
  },
} as const;
