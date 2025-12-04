// Service API pour intégration avec Backend Django
// Actuellement en mode MOCKUP - Prêt pour l'intégration

import type {
  CategoriesResponse,
  QuizResponse,
  SimulationRunRequest,
  SimulationRunResponse,
  SimulationRunsResponse,
  IdeaRequest,
  IdeaResponse,
  IdeasResponse,
  ResourcesResponse,
  HealthResponse,
} from '@/types/api';

import {
  mockCategoriesResponse,
  mockQuizResponse,
  mockIdeasResponse,
  mockResourcesResponse,
  mockHealthResponse,
} from './djangoMockData';

// Configuration
const USE_MOCK = true; // Mettre à false quand l'API Django sera prête
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Simule un délai réseau
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============= 1️⃣ GET /api/categories/ ✅ INDISPENSABLE =============
/**
 * Récupère toute la configuration de la simulation :
 * - Les catégories de choix (OS, suite bureautique, stockage, matériel)
 * - Les options possibles dans chaque catégorie
 * - Les impacts de chaque option
 */
export const getCategories = async (): Promise<CategoriesResponse> => {
  if (USE_MOCK) {
    await delay(300);
    return mockCategoriesResponse;
  }

  const response = await fetch(`${API_BASE_URL}/categories/`);
  if (!response.ok) throw new Error('Erreur lors de la récupération des catégories');
  return response.json();
};

// ============= 2️⃣ GET /api/quiz/ ✅ INDISPENSABLE =============
/**
 * Récupère les questions du quiz vrai/faux
 */
export const getQuiz = async (): Promise<QuizResponse> => {
  if (USE_MOCK) {
    await delay(300);
    return mockQuizResponse;
  }

  const response = await fetch(`${API_BASE_URL}/quiz/`);
  if (!response.ok) throw new Error('Erreur lors de la récupération du quiz');
  return response.json();
};

// ============= 3️⃣ POST /api/simulation-runs/ ✅ INDISPENSABLE =============
/**
 * Enregistre les résultats d'une simulation complétée
 * @param data - Scores finaux et choix du joueur
 */
export const submitSimulationRun = async (
  data: SimulationRunRequest
): Promise<SimulationRunResponse> => {
  if (USE_MOCK) {
    await delay(500);

    // Calculer le profil en fonction des scores
    const avgScore = (
      data.score_cost +
      data.score_ecology +
      data.score_autonomy +
      data.score_inclusion
    ) / 4;

    let profile = 'dependent';
    if (avgScore >= 70) profile = 'resistant';
    else if (avgScore >= 45) profile = 'transition';

    return {
      id: Math.floor(Math.random() * 10000),
      created_at: new Date().toISOString(),
      score_cost: data.score_cost,
      score_ecology: data.score_ecology,
      score_autonomy: data.score_autonomy,
      score_inclusion: data.score_inclusion,
      profile: profile,
      message: 'Simulation enregistrée avec succès! (MOCKUP)',
    };
  }

  const response = await fetch(`${API_BASE_URL}/simulation-runs/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Erreur lors de l\'enregistrement de la simulation');
  return response.json();
};

// ============= 4️⃣ GET /api/simulation-runs/ ⭐ BONUS =============
/**
 * Récupère la liste des simulations effectuées (pour stats/admin)
 * @param limit - Nombre max de résultats (défaut: 50)
 */
export const getSimulationRuns = async (limit = 50): Promise<SimulationRunsResponse> => {
  if (USE_MOCK) {
    await delay(300);

    // Générer quelques simulations fictives
    const results: SimulationRunResponse[] = [
      {
        id: 1,
        created_at: '2024-12-04T10:30:00Z',
        score_cost: 85,
        score_ecology: 90,
        score_autonomy: 95,
        score_inclusion: 80,
        profile: 'resistant',
      },
      {
        id: 2,
        created_at: '2024-12-04T11:15:00Z',
        score_cost: 60,
        score_ecology: 55,
        score_autonomy: 50,
        score_inclusion: 65,
        profile: 'transition',
      },
      {
        id: 3,
        created_at: '2024-12-04T12:00:00Z',
        score_cost: 30,
        score_ecology: 25,
        score_autonomy: 20,
        score_inclusion: 35,
        profile: 'dependent',
      },
    ];

    return {
      count: results.length,
      results: results.slice(0, limit),
    };
  }

  const response = await fetch(`${API_BASE_URL}/simulation-runs/?limit=${limit}`);
  if (!response.ok) throw new Error('Erreur lors de la récupération des simulations');
  return response.json();
};

// ============= 5️⃣ POST /api/ideas/ ✅ TRÈS UTILE =============
/**
 * Soumet une nouvelle idée pour rendre un établissement plus résistant
 * @param data - Titre, description, auteur, école
 */
export const submitIdea = async (data: IdeaRequest): Promise<IdeaResponse> => {
  if (USE_MOCK) {
    await delay(500);

    return {
      id: Math.floor(Math.random() * 10000),
      title: data.title,
      description: data.description,
      author_name: data.author_name || 'Anonyme',
      school_name: data.school_name || 'Non spécifié',
      is_approved: false,
      created_at: new Date().toISOString(),
    };
  }

  const response = await fetch(`${API_BASE_URL}/ideas/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Erreur lors de la soumission de l\'idée');
  return response.json();
};

// ============= 6️⃣ GET /api/ideas/ ✅ UTILE POUR LE FRONT =============
/**
 * Récupère les idées proposées par la communauté
 * @param approvedOnly - Si true, ne renvoie que les idées approuvées
 */
export const getIdeas = async (approvedOnly = true): Promise<IdeasResponse> => {
  if (USE_MOCK) {
    await delay(300);

    if (approvedOnly) {
      return mockIdeasResponse;
    }

    return mockIdeasResponse;
  }

  const url = approvedOnly
    ? `${API_BASE_URL}/ideas/?is_approved=true`
    : `${API_BASE_URL}/ideas/`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Erreur lors de la récupération des idées');
  return response.json();
};

// ============= 8️⃣ GET /api/resources/ ⭐ BONUS =============
/**
 * Récupère la liste des ressources pédagogiques
 */
export const getDjangoResources = async (): Promise<ResourcesResponse> => {
  if (USE_MOCK) {
    await delay(300);
    return mockResourcesResponse;
  }

  const response = await fetch(`${API_BASE_URL}/resources/`);
  if (!response.ok) throw new Error('Erreur lors de la récupération des ressources');
  return response.json();
};

// ============= 9️⃣ GET /api/health/ ⭐ BONUS =============
/**
 * Vérifie que le backend Django est accessible
 */
export const checkHealth = async (): Promise<HealthResponse> => {
  if (USE_MOCK) {
    await delay(100);
    return mockHealthResponse;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/health/`);
    if (!response.ok) throw new Error('Backend non accessible');
    return response.json();
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Erreur inconnue',
      timestamp: new Date().toISOString(),
    };
  }
};

// ============= Fonction utilitaire pour passer du mockup au réel =============
/**
 * Active ou désactive le mode mockup
 * @param useMock - true pour utiliser les données mockup
 */
export const setUseMock = (useMock: boolean) => {
  console.warn(
    '⚠️ Pour changer le mode mockup, modifiez la constante USE_MOCK dans djangoApi.ts'
  );
  // Cette fonction est ici pour documentation
  // En production, il faudra modifier USE_MOCK directement
};
