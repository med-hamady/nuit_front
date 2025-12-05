/**
 * Simulation Content
 * All content related to the simulation choices
 * Separated from logic for easy content updates
 */

export interface ChoiceTag {
    label: string;
    variant: 'positive' | 'negative' | 'neutral';
}

export interface ChoiceOption {
    id: string;
    title: string;
    description: string;
    tags: ChoiceTag[];
}

export interface ChoiceCategory {
    id: 'os' | 'office' | 'storage' | 'renewal';
    icon: string;
    title: string;
    subtitle: string;
    step: number;
    totalSteps: number;
    options: ChoiceOption[];
}

export const SIMULATION_CHOICES: ChoiceCategory[] = [
    {
        id: 'os',
        icon: 'Laptop',
        title: 'Système d\'exploitation des PC',
        subtitle: 'Ici tu choisis ce que tu fais des postes existants dans ton lycée pour équiper 50 salles de cours',
        step: 1,
        totalSteps: 4,
        options: [
            {
                id: 'windows',
                title: 'Acheter 50 nouveaux PC sous Windows 11',
                description: 'Matériel neuf avec licences Windows, confort d\'usage immédiat, mais coûts élevés et déchets électroniques importants.',
                tags: [
                    { label: 'Coût élevé', variant: 'negative' },
                    { label: 'Impact écologique mauvais', variant: 'negative' },
                    { label: 'Autonomie faible', variant: 'negative' },
                ],
            },
            {
                id: 'linux',
                title: 'Garder les anciens PC et installer Linux',
                description: 'Réemploi des machines existantes, logiciels libres, prolongation de la durée de vie de 5+ ans. Sobriété et autonomie.',
                tags: [
                    { label: 'Coût faible', variant: 'positive' },
                    { label: 'Très bon pour l\'écologie', variant: 'positive' },
                    { label: 'Autonomie forte', variant: 'positive' },
                ],
            },
        ],
    },
    {
        id: 'office',
        icon: 'FileText',
        title: 'Suite bureautique',
        subtitle: 'Outils de traitement de texte, tableur et présentation pour tous les enseignants et élèves',
        step: 2,
        totalSteps: 4,
        options: [
            {
                id: 'microsoft',
                title: 'Microsoft Office (licences payantes annuelles)',
                description: 'Suite connue et répandue, mais écosystème fermé et coût récurrent important pour l\'établissement.',
                tags: [
                    { label: 'Licences payantes', variant: 'negative' },
                    { label: 'Écosystème fermé', variant: 'negative' },
                ],
            },
            {
                id: 'libreoffice',
                title: 'LibreOffice (logiciel libre et gratuit)',
                description: 'Gratuit, libre, adaptable. Formats ouverts et plus d\'autonomie pour l\'établissement. Compatible avec Office.',
                tags: [
                    { label: 'Gratuit', variant: 'positive' },
                    { label: 'Logiciel libre', variant: 'positive' },
                    { label: 'Autonomie renforcée', variant: 'positive' },
                ],
            },
        ],
    },
    {
        id: 'storage',
        icon: 'Cloud',
        title: 'Stockage des données',
        subtitle: 'Hébergement des documents pédagogiques et données personnelles des élèves et enseignants',
        step: 3,
        totalSteps: 4,
        options: [
            {
                id: 'bigtech',
                title: 'Cloud d\'une grande entreprise (hors Europe)',
                description: 'Facile à déployer, mais questions de souveraineté des données et conformité RGPD délicate.',
                tags: [
                    { label: 'Dépendance forte', variant: 'negative' },
                    { label: 'Souveraineté faible', variant: 'negative' },
                ],
            },
            {
                id: 'european',
                title: 'Hébergeur européen / solution locale',
                description: 'Plus transparent, conforme RGPD, données en France ou Europe. Respect de la vie privée des élèves.',
                tags: [
                    { label: 'Plus souverain', variant: 'positive' },
                    { label: 'Vie privée protégée', variant: 'positive' },
                ],
            },
        ],
    },
    {
        id: 'renewal',
        icon: 'RefreshCw',
        title: 'Politique de renouvellement du matériel',
        subtitle: 'Stratégie de gestion du parc informatique sur le long terme (5-10 ans)',
        step: 4,
        totalSteps: 4,
        options: [
            {
                id: 'replace',
                title: 'Remplacement des PC tous les 3 ans',
                description: 'Parc toujours récent, mais déchets électroniques importants et coûts élevés sur la durée.',
                tags: [
                    { label: 'Beaucoup de déchets', variant: 'negative' },
                    { label: 'Coûts importants', variant: 'negative' },
                ],
            },
            {
                id: 'reuse',
                title: 'Réemploi, réparation, durée de vie prolongée',
                description: 'Sobriété numérique, moins de déchets, coûts maîtrisés sur le long terme. Cohérent avec NIRD.',
                tags: [
                    { label: 'Sobriété', variant: 'positive' },
                    { label: 'Moins de déchets', variant: 'positive' },
                    { label: 'Coût maîtrisé', variant: 'positive' },
                ],
            },
        ],
    },
];

export const CHOICE_EXPLANATIONS = {
    os: {
        linux: 'En choisissant Linux, tu prolonges la vie des machines de 5+ ans et tu réduis considérablement les déchets électroniques.',
        windows: 'Acheter du neuf génère des déchets et renforce la dépendance aux cycles de licences propriétaires.',
    },
    office: {
        libreoffice: 'LibreOffice réduit drastiquement les coûts et donne une vraie autonomie sur les outils bureautiques.',
        microsoft: 'Les licences Microsoft représentent un coût récurrent et un écosystème fermé.',
    },
    storage: {
        european: 'Un hébergeur européen garantit la souveraineté des données et une meilleure conformité RGPD.',
        bigtech: 'Les données sur des clouds non européens posent des questions de souveraineté et de vie privée.',
    },
    renewal: {
        reuse: 'Le réemploi et la réparation réduisent l\'empreinte carbone et les coûts sur le long terme.',
        replace: 'Un remplacement fréquent génère beaucoup de déchets électroniques.',
    },
} as const;

export const ACTION_ITEMS = [
    { icon: '/parc-informatique.png', text: 'Organiser un diagnostic du parc informatique existant' },
    { icon: '/logicielles-libres.png', text: 'Tester une salle pilote Linux + logiciels libres avec des enseignants volontaires' },
    { icon: '/connect.png', text: 'Contacter une structure de reconditionnement locale (ex: Emmaüs Connect, Ateliers du Bocage)' },
    { icon: '/Discuter.png', text: 'Discuter avec la collectivité pour des solutions d\'hébergement plus souveraines' },
    { icon: '/numerique.png', text: 'Impliquer les élèves/éco-délégués dans un projet de "numérique responsable"' },
] as const;

export const RESOURCE_IDEAS = [
    { icon: '/seance.png', text: 'Ateliers ou séances pédagogiques autour du numérique responsable et de la sobriété' },
    { icon: '/linux.png', text: 'Projet pilote sur un petit parc de machines reconditionnées sous Linux' },
    { icon: '/logicielles-libres.png', text: 'Club "logiciels libres" avec des élèves volontaires pour découvrir et tester' },
    { icon: '/association.png', text: 'Travail avec une association de reconditionnement locale pour collecter et rénover' },
    { icon: '/etablissement.png', text: 'Intégration de la démarche NIRD dans le projet d\'établissement et le CESC' },
] as const;

// Badges de gamification 🏆
export const ACHIEVEMENT_BADGES = {
    os: {
        linux: {
            id: 'penguin-friend',
            icon: '/Mon_Lycee_Reeistant.png',
            title: 'Ami des Manchots',
            description: 'Tu as libéré les PC du lycée avec Linux !',
            color: 'primary' as const,
        },
        windows: null,
    },
    office: {
        libreoffice: {
            id: 'free-writer',
            icon: '/cour_metriser.png',
            title: 'Plume Libre',
            description: 'Adieu les licences, vive LibreOffice !',
            color: 'accent' as const,
        },
        microsoft: null,
    },
    storage: {
        european: {
            id: 'data-guardian',
            icon: '/autonomie_numerique.png',
            title: 'Gardien des Données',
            description: 'Les données des élèves restent en France !',
            color: 'secondary' as const,
        },
        bigtech: null,
    },
    renewal: {
        reuse: {
            id: 'time-master',
            icon: '/Impact_ecologique.png',
            title: 'Maître du Temps',
            description: 'Tu as prolongé la vie du matériel de 5+ ans !',
            color: 'primary' as const,
        },
        replace: null,
    },
};
