/**
 * Drag & Drop Quiz Content
 * Questions where users drag answers to categories
 */

export interface DragDropAnswer {
    id: string;
    text: string;
    emoji: string;
    correctCategory: 'true' | 'false';
}

export interface DragDropQuestion {
    id: string;
    title: string;
    description: string;
    icon: string;
    answers: DragDropAnswer[];
}

export const DRAG_DROP_QUESTIONS: DragDropQuestion[] = [
    {
        id: 'digital-habits',
        title: 'Pratiques Numériques',
        description: 'Classe ces habitudes selon leur impact sur l\'empreinte numérique',
        icon: '💻',
        answers: [
            {
                id: 'stream-4k',
                text: 'Regarder des vidéos en 4K réduit mon empreinte numérique',
                emoji: '📺',
                correctCategory: 'false',
            },
            {
                id: 'repair-device',
                text: 'Réparer son téléphone est une bonne pratique écologique',
                emoji: '🔧',
                correctCategory: 'true',
            },
            {
                id: 'delete-emails',
                text: 'Supprimer ses emails contribue à réduire son empreinte numérique',
                emoji: '📧',
                correctCategory: 'true',
            },
            {
                id: 'cloud-storage',
                text: 'Stocker tous ses fichiers dans le cloud est plus écologique',
                emoji: '☁️',
                correctCategory: 'false',
            },
            {
                id: 'local-backup',
                text: 'La sauvegarde locale consomme moins d\'énergie que le cloud',
                emoji: '💾',
                correctCategory: 'true',
            },
            {
                id: 'auto-play',
                text: 'Laisser l\'autoplay activé n\'a pas d\'impact environnemental',
                emoji: '▶️',
                correctCategory: 'false',
            },
        ],
    },
    {
        id: 'school-choices',
        title: 'Choix du Lycée',
        description: 'Identifie les meilleures pratiques pour un lycée numérique responsable',
        icon: '🏫',
        answers: [
            {
                id: 'new-computers',
                text: 'Un lycée devrait acheter de nouveaux ordinateurs chaque année',
                emoji: '🖥️',
                correctCategory: 'false',
            },
            {
                id: 'open-source',
                text: 'Les logiciels libres sont recommandés pour un numérique responsable',
                emoji: '🐧',
                correctCategory: 'true',
            },
            {
                id: 'reconditioned',
                text: 'Les ordinateurs reconditionnés sont une alternative écologique',
                emoji: '♻️',
                correctCategory: 'true',
            },
            {
                id: 'proprietary',
                text: 'Les licences propriétaires sont meilleures pour l\'école',
                emoji: '💳',
                correctCategory: 'false',
            },
            {
                id: 'european-cloud',
                text: 'L\'hébergement européen protège mieux nos données',
                emoji: '🇪🇺',
                correctCategory: 'true',
            },
            {
                id: 'big-tech-cloud',
                text: 'Utiliser les services cloud des Big Tech hors Europe est sans risque',
                emoji: '🌍',
                correctCategory: 'false',
            },
        ],
    },
    {
        id: 'data-privacy',
        title: 'Vie Privée & Données',
        description: 'Quelles pratiques protègent mieux ta vie privée ?',
        icon: '🔒',
        answers: [
            {
                id: 'accept-cookies',
                text: 'Accepter tous les cookies est sans danger pour ma vie privée',
                emoji: '🍪',
                correctCategory: 'false',
            },
            {
                id: 'vpn',
                text: 'Utiliser un VPN améliore la protection de ma vie privée',
                emoji: '🛡️',
                correctCategory: 'true',
            },
            {
                id: 'strong-password',
                text: 'Avoir des mots de passe forts et uniques est important',
                emoji: '🔐',
                correctCategory: 'true',
            },
            {
                id: 'share-data',
                text: 'Partager mes données personnelles n\'a pas de conséquence',
                emoji: '📱',
                correctCategory: 'false',
            },
            {
                id: 'two-factor',
                text: 'L\'authentification à deux facteurs renforce la sécurité',
                emoji: '🔑',
                correctCategory: 'true',
            },
            {
                id: 'public-wifi',
                text: 'Se connecter à n\'importe quel WiFi public est sécurisé',
                emoji: '📶',
                correctCategory: 'false',
            },
        ],
    },
];

export const CATEGORY_INFO = {
    true: {
        label: 'Vrai ✓',
        color: 'secondary',
        description: 'Glisse ici les affirmations vraies',
    },
    false: {
        label: 'Faux ✗',
        color: 'accent',
        description: 'Glisse ici les affirmations fausses',
    },
} as const;
