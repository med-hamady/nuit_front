// Données mockup pour simuler l'API Django

import { Resource, Action, CommunityProject, Statistics, Badge } from '@/types/api';

export const mockResources: Resource[] = [
  {
    id: 1,
    title: "Installer Linux dans votre établissement",
    type: "guide",
    description: "Guide complet pour migrer vos ordinateurs vers Linux Ubuntu ou Debian",
    url: "https://example.com/guide-linux",
    tags: ["linux", "installation", "débutant"],
    difficulty: "intermediaire"
  },
  {
    id: 2,
    title: "LibreOffice : Alternative à Microsoft Office",
    type: "tool",
    description: "Suite bureautique libre et gratuite compatible avec les formats Microsoft",
    url: "https://fr.libreoffice.org/",
    tags: ["bureautique", "logiciel libre"],
    difficulty: "debutant"
  },
  {
    id: 3,
    title: "Framalibre : Annuaire du Libre",
    type: "tool",
    description: "Plus de 1500 logiciels libres pour remplacer vos outils propriétaires",
    url: "https://framalibre.org/",
    tags: ["logiciels libres", "annuaire"],
    difficulty: "debutant"
  },
  {
    id: 4,
    title: "La Nuit de l'Info - NIRD",
    type: "article",
    description: "Découvrez le projet NIRD : Numérique Inclusif, Responsable et Durable",
    url: "https://www.nuitdelinfo.com/",
    tags: ["NIRD", "souveraineté numérique"],
    difficulty: "debutant"
  },
  {
    id: 5,
    title: "Nextcloud : Cloud souverain",
    type: "tool",
    description: "Solution d'hébergement de fichiers auto-hébergée et sécurisée",
    url: "https://nextcloud.com/",
    tags: ["cloud", "hébergement", "données"],
    difficulty: "avance"
  },
  {
    id: 6,
    title: "Emmabuntüs : Linux pour le réemploi",
    type: "tool",
    description: "Distribution Linux spécialement conçue pour redonner vie aux vieux PC",
    url: "https://emmabuntus.org/",
    tags: ["linux", "réemploi", "écologie"],
    difficulty: "intermediaire"
  },
  {
    id: 7,
    title: "April : Association de promotion du Libre",
    type: "association",
    description: "Pionnière du logiciel libre en France depuis 1996",
    url: "https://www.april.org/",
    tags: ["association", "libre", "communauté"],
    difficulty: "debutant"
  },
  {
    id: 8,
    title: "Framasoft : Dégooglisons Internet",
    type: "association",
    description: "Services libres et éthiques pour se libérer des GAFAM",
    url: "https://framasoft.org/",
    tags: ["association", "services", "GAFAM"],
    difficulty: "debutant"
  }
];

export const mockActions: Action[] = [
  {
    id: 1,
    title: "Organiser une journée de sensibilisation",
    description: "Présenter NIRD aux équipes éducatives et administrative",
    category: "immediat",
    difficulty: "facile",
    impact: "moyen",
    steps: [
      "Réserver une salle et une date",
      "Préparer une présentation PowerPoint/LibreOffice Impress",
      "Inviter les professeurs, CPE, direction",
      "Montrer des exemples concrets d'établissements ayant réussi",
      "Ouvrir un débat sur les actions possibles"
    ]
  },
  {
    id: 2,
    title: "Créer un club du Libre",
    description: "Lancer un club informatique axé sur les logiciels libres et Linux",
    category: "court_terme",
    difficulty: "facile",
    impact: "fort",
    steps: [
      "Trouver un enseignant référent",
      "Définir un créneau hebdomadaire",
      "Récupérer quelques vieux PC pour expérimenter",
      "Installer Linux en atelier avec les élèves",
      "Créer des projets : site web, jeux, programmation..."
    ]
  },
  {
    id: 3,
    title: "Former les enseignants à LibreOffice",
    description: "Session de formation pour remplacer Microsoft Office",
    category: "court_terme",
    difficulty: "moyen",
    impact: "fort",
    steps: [
      "Identifier les besoins de formation",
      "Organiser 2-3 sessions de 2h",
      "Fournir des supports de formation",
      "Accompagner la transition progressivement",
      "Créer une aide en ligne ou FAQ"
    ]
  },
  {
    id: 4,
    title: "Auditer le parc informatique",
    description: "Évaluer l'état des ordinateurs pour identifier ceux à réemployer",
    category: "immediat",
    difficulty: "moyen",
    impact: "fort",
    steps: [
      "Lister tous les ordinateurs de l'établissement",
      "Noter l'état, l'âge, les performances",
      "Identifier les PC fonctionnels mais 'obsolètes' sous Windows",
      "Calculer le coût du remplacement vs réemploi",
      "Présenter le rapport à la direction"
    ]
  },
  {
    id: 5,
    title: "Migrer vers un cloud européen",
    description: "Remplacer les services Google/Microsoft par des alternatives souveraines",
    category: "long_terme",
    difficulty: "difficile",
    impact: "fort",
    steps: [
      "Analyser les besoins actuels (stockage, partage, collaboration)",
      "Comparer les solutions : Nextcloud, Cozy Cloud, etc.",
      "Tester une solution avec un groupe pilote",
      "Former les utilisateurs",
      "Migrer progressivement les données",
      "Établir un plan de sauvegarde"
    ]
  },
  {
    id: 6,
    title: "Installer Linux sur 10 PC pilotes",
    description: "Projet pilote pour tester Linux en conditions réelles",
    category: "court_terme",
    difficulty: "moyen",
    impact: "fort",
    steps: [
      "Sélectionner 10 PC adaptés (assez récents ou anciens)",
      "Choisir une distribution : Ubuntu, Linux Mint, Emmabuntüs",
      "Créer une clé USB bootable",
      "Installer Linux et les logiciels essentiels",
      "Tester pendant 1 mois avec des utilisateurs volontaires",
      "Recueillir les retours et ajuster"
    ]
  },
  {
    id: 7,
    title: "Rejoindre une association du Libre",
    description: "S'appuyer sur une communauté locale pour être accompagné",
    category: "immediat",
    difficulty: "facile",
    impact: "moyen",
    steps: [
      "Rechercher les associations locales (April, Framasoft, Linux User Groups...)",
      "Les contacter pour présenter votre projet",
      "Participer à leurs événements",
      "Inviter un membre pour une intervention dans votre établissement",
      "Créer un partenariat pour de l'aide technique"
    ]
  },
  {
    id: 8,
    title: "Organiser une Install Party",
    description: "Événement pour installer Linux sur les ordinateurs personnels",
    category: "court_terme",
    difficulty: "facile",
    impact: "moyen",
    steps: [
      "Fixer une date (samedi après-midi par exemple)",
      "Inviter élèves, profs, parents avec leurs PC",
      "Prévoir des experts Linux (association, club du libre)",
      "Installer Linux en dual-boot ou remplacement",
      "Fournir des documents de prise en main"
    ]
  }
];

export const mockCommunityProjects: CommunityProject[] = [
  {
    id: 1,
    schoolName: "Lycée Victor Hugo",
    city: "Paris",
    type: "Migration Linux complète",
    description: "Migration de 120 postes sous Ubuntu, formation des enseignants",
    results: "Économie de 45 000€ en licences, réemploi de 40 PC",
    date: "2024-03"
  },
  {
    id: 2,
    schoolName: "Collège Jean Moulin",
    city: "Lyon",
    type: "Cloud souverain",
    description: "Déploiement de Nextcloud pour 600 élèves",
    results: "Données en France, zéro dépendance Google",
    date: "2024-06"
  },
  {
    id: 3,
    schoolName: "Lycée Professionnel Diderot",
    city: "Marseille",
    type: "Atelier de reconditionnement",
    description: "Club informatique qui reconditionne des PC pour les familles",
    results: "50 PC reconditionnés et redistribués",
    date: "2024-01"
  },
  {
    id: 4,
    schoolName: "Collège Marie Curie",
    city: "Toulouse",
    type: "Suite bureautique libre",
    description: "Passage à LibreOffice pour tous les postes administratifs",
    results: "8 000€ économisés par an",
    date: "2023-11"
  },
  {
    id: 5,
    schoolName: "Lycée Pasteur",
    city: "Strasbourg",
    type: "Club du Libre",
    description: "30 élèves apprennent Linux, Python et contribuent à des projets open source",
    results: "Inclusion numérique, compétences valorisées",
    date: "2024-09"
  }
];

export const mockBadges: Badge[] = [
  {
    id: "first_choice",
    name: "Premier pas",
    description: "Faire ton premier choix dans la simulation",
    icon: "👣",
    condition: "Faire au moins un choix",
    unlocked: false
  },
  {
    id: "all_choices",
    name: "Décideur engagé",
    description: "Compléter tous les choix de la simulation",
    icon: "✅",
    condition: "Faire les 4 choix",
    unlocked: false
  },
  {
    id: "resistant",
    name: "Village Résistant",
    description: "Atteindre le profil 'Résistant'",
    icon: "🏆",
    condition: "Score moyen >= 70",
    unlocked: false
  },
  {
    id: "eco_warrior",
    name: "Guerrier Écolo",
    description: "Impact écologique >= 80",
    icon: "🌱",
    condition: "Jauge écologie >= 80",
    unlocked: false
  },
  {
    id: "free_champion",
    name: "Champion du Libre",
    description: "Autonomie >= 80",
    icon: "🔓",
    condition: "Jauge autonomie >= 80",
    unlocked: false
  },
  {
    id: "inclusive",
    name: "Inclusif",
    description: "Inclusion >= 80",
    icon: "🤝",
    condition: "Jauge inclusion >= 80",
    unlocked: false
  },
  {
    id: "cost_master",
    name: "Maître des coûts",
    description: "Coût maîtrisé >= 80",
    icon: "💰",
    condition: "Jauge coût >= 80",
    unlocked: false
  },
  {
    id: "perfect",
    name: "Perfection NIRD",
    description: "Tous les indicateurs à 100%",
    icon: "⭐",
    condition: "Toutes les jauges à 100",
    unlocked: false
  }
];

export const mockStatistics: Statistics = {
  totalUsers: 1547,
  scenariosCompleted: 892,
  averageScore: 67,
  topChoice: {
    category: "os",
    value: "linux",
    percentage: 73
  }
};
