/**
 * True/False Quiz Content
 * Questions where users answer true or false to statements
 */

export interface TrueFalseStatement {
    id: string;
    statement: string;
    isTrue: boolean;
    emoji: string;
    explanation: string;
}

export interface TrueFalseQuestion {
    id: string;
    title: string;
    description: string;
    icon: string;
    statements: TrueFalseStatement[];
}

export const TRUE_FALSE_QUESTIONS: TrueFalseQuestion[] = [
    {
        id: 'digital-habits',
        title: 'Pratiques Numériques',
        description: 'Évalue tes connaissances sur les bonnes pratiques numériques',
        icon: '💻',
        statements: [
            {
                id: 'stream-4k',
                statement: 'Regarder des vidéos en 4K réduit mon empreinte numérique',
                isTrue: false,
                emoji: '📺',
                explanation: 'Faux ! Le streaming en 4K consomme beaucoup plus de données et d\'énergie que les résolutions inférieures.',
            },
            {
                id: 'repair-device',
                statement: 'Réparer son téléphone au lieu d\'en acheter un neuf est une bonne pratique',
                isTrue: true,
                emoji: '🔧',
                explanation: 'Vrai ! Réparer prolonge la durée de vie des appareils et réduit les déchets électroniques.',
            },
            {
                id: 'delete-emails',
                statement: 'Supprimer régulièrement ses emails contribue à réduire son empreinte numérique',
                isTrue: true,
                emoji: '📧',
                explanation: 'Vrai ! Les emails stockés consomment de l\'énergie sur les serveurs. Les supprimer réduit cette consommation.',
            },
            {
                id: 'cloud-storage',
                statement: 'Stocker tous mes fichiers dans le cloud est plus écologique que le stockage local',
                isTrue: false,
                emoji: '☁️',
                explanation: 'Faux ! Le cloud nécessite des data centers énergivores. Le stockage local est souvent plus sobre.',
            },
            {
                id: 'auto-play',
                statement: 'Laisser l\'autoplay activé sur les plateformes vidéo n\'a pas d\'impact environnemental',
                isTrue: false,
                emoji: '▶️',
                explanation: 'Faux ! L\'autoplay fait consommer du contenu inutile, augmentant la consommation de données et d\'énergie.',
            },
        ],
    },
    {
        id: 'school-choices',
        title: 'Choix du Lycée',
        description: 'Teste tes connaissances sur le numérique responsable à l\'école',
        icon: '🏫',
        statements: [
            {
                id: 'new-computers',
                statement: 'Un lycée responsable devrait acheter de nouveaux ordinateurs chaque année',
                isTrue: false,
                emoji: '🖥️',
                explanation: 'Faux ! Renouveler le matériel trop souvent génère beaucoup de déchets. Mieux vaut réparer et prolonger la durée de vie.',
            },
            {
                id: 'open-source',
                statement: 'Les logiciels libres et open-source sont recommandés pour un numérique responsable',
                isTrue: true,
                emoji: '🐧',
                explanation: 'Vrai ! Les logiciels libres favorisent la transparence, l\'autonomie et évitent la dépendance aux grandes entreprises.',
            },
            {
                id: 'reconditioned',
                statement: 'Acheter des ordinateurs reconditionnés est une alternative écologique',
                isTrue: true,
                emoji: '♻️',
                explanation: 'Vrai ! Le reconditionné réduit la production de nouveaux équipements et donne une seconde vie aux appareils.',
            },
            {
                id: 'big-tech-cloud',
                statement: 'Utiliser les services cloud des Big Tech hors Europe protège mieux nos données',
                isTrue: false,
                emoji: '🌍',
                explanation: 'Faux ! Les hébergeurs européens offrent une meilleure protection des données grâce au RGPD.',
            },
        ],
    },
    {
        id: 'data-privacy',
        title: 'Vie Privée & Données',
        description: 'Vérifie tes connaissances sur la protection de la vie privée',
        icon: '🔒',
        statements: [
            {
                id: 'accept-cookies',
                statement: 'Accepter tous les cookies est sans danger pour ma vie privée',
                isTrue: false,
                emoji: '🍪',
                explanation: 'Faux ! Les cookies permettent le tracking et la collecte de données personnelles pour le ciblage publicitaire.',
            },
            {
                id: 'vpn',
                statement: 'Utiliser un VPN améliore la protection de ma vie privée en ligne',
                isTrue: true,
                emoji: '🛡️',
                explanation: 'Vrai ! Un VPN chiffre votre connexion et masque votre adresse IP, protégeant votre navigation.',
            },
            {
                id: 'strong-password',
                statement: 'Avoir des mots de passe forts et uniques pour chaque service est important',
                isTrue: true,
                emoji: '🔐',
                explanation: 'Vrai ! Cela empêche qu\'une fuite de données sur un service compromette tous vos comptes.',
            },
            {
                id: 'public-wifi',
                statement: 'Se connecter à n\'importe quel WiFi public est sécurisé',
                isTrue: false,
                emoji: '📶',
                explanation: 'Faux ! Les WiFi publics peuvent être dangereux. Utilisez un VPN ou évitez les transactions sensibles.',
            },
            {
                id: 'two-factor',
                statement: 'L\'authentification à deux facteurs renforce la sécurité de mes comptes',
                isTrue: true,
                emoji: '🔑',
                explanation: 'Vrai ! Le 2FA ajoute une couche de protection même si votre mot de passe est compromis.',
            },
        ],
    },
];
