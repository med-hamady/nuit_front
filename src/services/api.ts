// Service API mockup - Sera remplacé par les vrais appels Django plus tard

import {
  Resource,
  Action,
  CommunityProject,
  Statistics,
  Badge
} from '@/types/api';
import {
  mockResources,
  mockActions,
  mockCommunityProjects,
  mockStatistics,
  mockBadges
} from './mockData';

// Simule un délai réseau pour plus de réalisme
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============= API Resources =============
export const getResources = async (): Promise<Resource[]> => {
  await delay(300);
  return mockResources;
};

export const getResourcesByType = async (type: string): Promise<Resource[]> => {
  await delay(300);
  return mockResources.filter(r => r.type === type);
};

export const getResourcesByTag = async (tag: string): Promise<Resource[]> => {
  await delay(300);
  return mockResources.filter(r => r.tags.includes(tag));
};

// ============= API Actions =============
export const getActions = async (): Promise<Action[]> => {
  await delay(300);
  return mockActions;
};

export const getActionsByCategory = async (category: string): Promise<Action[]> => {
  await delay(300);
  return mockActions.filter(a => a.category === category);
};

// ============= API Community =============
export const getCommunityProjects = async (): Promise<CommunityProject[]> => {
  await delay(300);
  return mockCommunityProjects;
};

// ============= API Statistics =============
export const getStatistics = async (): Promise<Statistics> => {
  await delay(300);
  return mockStatistics;
};

// ============= API Badges =============
export const getBadges = async (gauges: {
  cost: number;
  ecology: number;
  autonomy: number;
  inclusion: number;
}): Promise<Badge[]> => {
  await delay(300);

  const badges = [...mockBadges];

  // Logique pour débloquer les badges selon les jauges
  badges.forEach(badge => {
    switch (badge.id) {
      case 'first_choice':
        badge.unlocked = true; // Si on est sur la page résultat, forcément au moins un choix
        break;
      case 'all_choices':
        badge.unlocked = true; // Si on est sur la page résultat, tous les choix faits
        break;
      case 'resistant':
        const avg = (gauges.cost + gauges.ecology + gauges.autonomy + gauges.inclusion) / 4;
        badge.unlocked = avg >= 70;
        break;
      case 'eco_warrior':
        badge.unlocked = gauges.ecology >= 80;
        break;
      case 'free_champion':
        badge.unlocked = gauges.autonomy >= 80;
        break;
      case 'inclusive':
        badge.unlocked = gauges.inclusion >= 80;
        break;
      case 'cost_master':
        badge.unlocked = gauges.cost >= 80;
        break;
      case 'perfect':
        badge.unlocked = gauges.cost === 100 &&
                        gauges.ecology === 100 &&
                        gauges.autonomy === 100 &&
                        gauges.inclusion === 100;
        break;
    }
  });

  return badges;
};

// ============= API Submission =============
export const submitScenario = async (choices: Record<string, string>, gauges: any): Promise<{ success: boolean; message: string }> => {
  await delay(500);

  // Simule l'enregistrement du scénario dans la base de données
  console.log('Scénario soumis:', { choices, gauges });

  return {
    success: true,
    message: 'Scénario enregistré avec succès!'
  };
};
