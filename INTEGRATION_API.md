# 🔌 Guide d'intégration avec l'API Django

Ce document explique comment intégrer l'application frontend avec l'API backend Django.

## 📋 Structure actuelle

Actuellement, l'application utilise des données **mockup** situées dans :
- `src/services/mockData.ts` : Données de test
- `src/services/api.ts` : Fonctions mockup simulant les appels API

## 🎯 Objectif

Remplacer les données mockup par de vrais appels à l'API Django sans modifier le reste de l'application.

## ⚙️ Configuration

### 1. Variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
# URL de l'API Django
VITE_API_URL=http://localhost:8000/api

# Optionnel : clé API si authentification
VITE_API_KEY=votre-cle-api
```

### 2. Ajouter axios pour les requêtes HTTP

```bash
npm install axios
# ou
bun add axios
```

## 🛠️ Modification du service API

Remplacer le contenu de `src/services/api.ts` :

```typescript
import axios from 'axios';
import type {
  Resource,
  Action,
  CommunityProject,
  Statistics,
  Badge
} from '@/types/api';

// Configuration de base axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercepteur pour ajouter la clé API si nécessaire
api.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (apiKey) {
    config.headers['X-API-Key'] = apiKey;
  }
  return config;
});

// ============= API Resources =============
export const getResources = async (): Promise<Resource[]> => {
  const { data } = await api.get('/resources/');
  return data;
};

export const getResourcesByType = async (type: string): Promise<Resource[]> => {
  const { data } = await api.get(\`/resources/?type=\${type}\`);
  return data;
};

export const getResourcesByTag = async (tag: string): Promise<Resource[]> => {
  const { data } = await api.get(\`/resources/?tag=\${tag}\`);
  return data;
};

// ============= API Actions =============
export const getActions = async (): Promise<Action[]> => {
  const { data } = await api.get('/actions/');
  return data;
};

export const getActionsByCategory = async (category: string): Promise<Action[]> => {
  const { data } = await api.get(\`/actions/?category=\${category}\`);
  return data;
};

// ============= API Community =============
export const getCommunityProjects = async (): Promise<CommunityProject[]> => {
  const { data } = await api.get('/community-projects/');
  return data;
};

// ============= API Statistics =============
export const getStatistics = async (): Promise<Statistics> => {
  const { data } = await api.get('/statistics/');
  return data;
};

// ============= API Badges =============
export const getBadges = async (gauges: {
  cost: number;
  ecology: number;
  autonomy: number;
  inclusion: number;
}): Promise<Badge[]> => {
  const { data } = await api.get('/badges/', {
    params: {
      cost: gauges.cost,
      ecology: gauges.ecology,
      autonomy: gauges.autonomy,
      inclusion: gauges.inclusion
    }
  });
  return data;
};

// ============= API Submission =============
export const submitScenario = async (
  choices: Record<string, string>,
  gauges: any
): Promise<{ success: boolean; message: string }> => {
  const { data } = await api.post('/scenarios/', {
    choices,
    gauges,
    timestamp: new Date().toISOString()
  });
  return data;
};
```

## 📡 Endpoints Django attendus

### 1. Resources

**GET /api/resources/**
```json
[
  {
    "id": 1,
    "title": "Installer Linux dans votre établissement",
    "type": "guide",
    "description": "Guide complet...",
    "url": "https://...",
    "tags": ["linux", "installation"],
    "difficulty": "intermediaire"
  }
]
```

**GET /api/resources/?type=guide**
Filtre par type : guide, tool, article, association, video

**GET /api/resources/?tag=linux**
Filtre par tag

### 2. Actions

**GET /api/actions/**
```json
[
  {
    "id": 1,
    "title": "Organiser une journée de sensibilisation",
    "description": "Présenter NIRD...",
    "category": "immediat",
    "difficulty": "facile",
    "impact": "moyen",
    "steps": [
      "Réserver une salle",
      "Préparer une présentation",
      "..."
    ]
  }
]
```

**GET /api/actions/?category=immediat**
Filtre par catégorie : immediat, court_terme, long_terme

### 3. Community Projects

**GET /api/community-projects/**
```json
[
  {
    "id": 1,
    "schoolName": "Lycée Victor Hugo",
    "city": "Paris",
    "type": "Migration Linux complète",
    "description": "Migration de 120 postes...",
    "results": "Économie de 45 000€...",
    "image": "https://...",
    "date": "2024-03-15"
  }
]
```

### 4. Statistics

**GET /api/statistics/**
```json
{
  "totalUsers": 1547,
  "scenariosCompleted": 892,
  "averageScore": 67,
  "topChoice": {
    "category": "os",
    "value": "linux",
    "percentage": 73
  }
}
```

### 5. Badges

**GET /api/badges/?cost=80&ecology=90&autonomy=85&inclusion=75**
```json
[
  {
    "id": "first_choice",
    "name": "Premier pas",
    "description": "Faire ton premier choix...",
    "icon": "👣",
    "condition": "Faire au moins un choix",
    "unlocked": true
  }
]
```

### 6. Submit Scenario

**POST /api/scenarios/**

Request:
```json
{
  "choices": {
    "os": "linux",
    "office": "libreoffice",
    "storage": "european",
    "renewal": "reuse"
  },
  "gauges": {
    "cost": 85,
    "ecology": 95,
    "autonomy": 90,
    "inclusion": 80
  },
  "timestamp": "2024-12-04T16:30:00Z"
}
```

Response:
```json
{
  "success": true,
  "message": "Scénario enregistré avec succès!",
  "scenarioId": 123
}
```

## 🔒 CORS Configuration

Dans Django, configurer CORS pour autoriser le frontend :

```python
# settings.py
INSTALLED_APPS = [
    # ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ...
]

# En développement
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://localhost:8081",
]

# En production
CORS_ALLOWED_ORIGINS = [
    "https://votre-domaine.com",
]
```

## 🧪 Test de l'intégration

### 1. Vérifier la connexion

Créer un fichier `src/services/apiTest.ts` :

```typescript
import { getResources, getActions } from './api';

export async function testApiConnection() {
  try {
    console.log('🔍 Test de connexion à l\'API...');

    const resources = await getResources();
    console.log('✅ Resources:', resources.length, 'items');

    const actions = await getActions();
    console.log('✅ Actions:', actions.length, 'items');

    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion:', error);
    return false;
  }
}
```

### 2. Appeler dans le composant

```typescript
import { useEffect } from 'react';
import { testApiConnection } from '@/services/apiTest';

// Dans un composant
useEffect(() => {
  if (import.meta.env.DEV) {
    testApiConnection();
  }
}, []);
```

## 🔄 Transition progressive

Pour une transition en douceur, vous pouvez garder les deux systèmes :

```typescript
// src/services/api.ts
import { mockResources } from './mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const getResources = async (): Promise<Resource[]> => {
  if (USE_MOCK) {
    // Utiliser les données mockup
    await delay(300);
    return mockResources;
  } else {
    // Utiliser l'API réelle
    const { data } = await api.get('/resources/');
    return data;
  }
};
```

Dans `.env` :
```env
VITE_USE_MOCK=false
```

## 🐛 Gestion des erreurs

Ajouter un gestionnaire d'erreurs global :

```typescript
// src/services/api.ts
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.error('Endpoint non trouvé:', error.config.url);
    } else if (error.response?.status === 500) {
      console.error('Erreur serveur:', error.message);
    } else if (error.code === 'ECONNREFUSED') {
      console.error('API non accessible. Vérifiez que Django est lancé.');
    }
    return Promise.reject(error);
  }
);
```

## 📝 Checklist d'intégration

- [ ] Créer le fichier `.env` avec `VITE_API_URL`
- [ ] Installer axios : `npm install axios`
- [ ] Modifier `src/services/api.ts` avec les vrais appels
- [ ] Configurer CORS dans Django
- [ ] Tester chaque endpoint individuellement
- [ ] Vérifier les types TypeScript correspondent aux réponses Django
- [ ] Gérer les cas d'erreur (404, 500, timeout)
- [ ] Tester en production avec l'URL de production

## 🚀 Prochaines étapes

1. **Backend** : Implémenter tous les endpoints listés ci-dessus
2. **Frontend** : Remplacer les imports mockup par les vrais appels
3. **Tests** : Vérifier que tout fonctionne
4. **Production** : Déployer avec les bonnes URLs

---

**Questions ?** N'hésitez pas à contacter l'équipe frontend ! 🌱
