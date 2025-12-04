// Types pour l'API Django Backend

// ============= GET /api/categories/ ✅ =============
export interface Option {
  id: number;
  name: string;
  description: string;
  impact_cost: number;        // -100 à +100
  impact_ecology: number;     // -100 à +100
  impact_autonomy: number;    // -100 à +100
  impact_inclusion: number;   // -100 à +100
  tags?: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;  // 'os', 'office', 'storage', 'renewal'
  title: string;
  subtitle: string;
  icon: string;
  step: number;
  total_steps: number;
  options: Option[];
}

export interface CategoriesResponse {
  categories: Category[];
}

// ============= GET /api/quiz/ ✅ =============
export interface QuizQuestion {
  id: number;
  question: string;
  is_true: boolean;
  explanation: string;
  category?: string;
  difficulty?: 'facile' | 'moyen' | 'difficile';
}

export interface QuizResponse {
  questions: QuizQuestion[];
}

// ============= POST /api/simulation-runs/ ✅ =============
export interface SimulationRunRequest {
  score_cost: number;
  score_ecology: number;
  score_autonomy: number;
  score_inclusion: number;
  choices: Record<string, number>;  // { "os": 1, "office": 2, ... }
  profile?: string;  // 'resistant', 'transition', 'dependent'
}

export interface SimulationRunResponse {
  id: number;
  created_at: string;
  score_cost: number;
  score_ecology: number;
  score_autonomy: number;
  score_inclusion: number;
  profile: string;
  message?: string;
}

// ============= GET /api/simulation-runs/ ⭐ =============
export interface SimulationRunsResponse {
  count: number;
  results: SimulationRunResponse[];
}

// ============= POST /api/ideas/ ✅ =============
export interface IdeaRequest {
  title: string;
  description: string;
  author_name?: string;
  school_name?: string;
}

export interface IdeaResponse {
  id: number;
  title: string;
  description: string;
  author_name: string;
  school_name: string;
  is_approved: boolean;
  created_at: string;
}

// ============= GET /api/ideas/ ✅ =============
export interface IdeasResponse {
  count: number;
  results: IdeaResponse[];
}

// ============= GET /api/resources/ ⭐ =============
export interface ResourceResponse {
  id: number;
  title: string;
  type: 'video' | 'article' | 'site' | 'guide' | 'tool';
  url: string;
  description: string;
  tags?: string[];
}

export interface ResourcesResponse {
  count: number;
  results: ResourceResponse[];
}

// ============= GET /api/health/ ⭐ =============
export interface HealthResponse {
  status: 'ok' | 'error';
  message?: string;
  timestamp?: string;
}

// ============= Types Frontend (anciens, pour compatibilité) =============
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
  unlocked: boolean;
}

export interface Resource {
  id: number;
  title: string;
  type: 'article' | 'video' | 'guide' | 'tool' | 'association';
  description: string;
  url: string;
  tags: string[];
  difficulty?: 'debutant' | 'intermediaire' | 'avance';
}

export interface Action {
  id: number;
  title: string;
  description: string;
  category: 'immediat' | 'court_terme' | 'long_terme';
  difficulty: 'facile' | 'moyen' | 'difficile';
  impact: 'faible' | 'moyen' | 'fort';
  steps: string[];
}

export interface CommunityProject {
  id: number;
  schoolName: string;
  city: string;
  type: string;
  description: string;
  results: string;
  image?: string;
  date: string;
}

export interface Statistics {
  totalUsers: number;
  scenariosCompleted: number;
  averageScore: number;
  topChoice: {
    category: string;
    value: string;
    percentage: number;
  };
}
