# 🔌 Guide d'intégration Frontend-Backend Django

Documentation complète pour connecter l'application React avec l'API Backend Django.

## 📊 État actuel

✅ **Frontend prêt avec données mockup**
- Toutes les fonctionnalités sont implémentées
- Données mockup dans `src/services/djangoMockData.ts`
- Service API dans `src/services/djangoApi.ts`
- Types TypeScript correspondant exactement à la structure Django

## 🎯 APIs Django implémentées

### ✅ INDISPENSABLES (à implémenter en priorité)

#### 1️⃣ GET /api/categories/
**Rôle** : Configuration complète de la simulation

**Réponse attendue** :
```json
{
  "categories": [
    {
      "id": 1,
      "name": "Système d'exploitation",
      "slug": "os",
      "title": "Système d'exploitation des PC",
      "subtitle": "Choisis ce que tu fais des postes existants...",
      "icon": "Laptop",
      "step": 1,
      "total_steps": 4,
      "options": [
        {
          "id": 1,
          "name": "Windows 11 neuf",
          "description": "Acheter 50 nouveaux PC...",
          "impact_cost": -20,
          "impact_ecology": -25,
          "impact_autonomy": -30,
          "impact_inclusion": 0,
          "tags": ["Coût élevé", "Impact écologique mauvais"]
        }
      ]
    }
  ]
}
```

**Usage Frontend** : Chargé une seule fois au démarrage de la simulation

---

#### 2️⃣ GET /api/quiz/
**Rôle** : Questions vrai/faux pour le quiz

**Réponse attendue** :
```json
{
  "questions": [
    {
      "id": 1,
      "question": "Un ordinateur sous Windows 10 ne peut plus être utilisé après 2025",
      "is_true": false,
      "explanation": "Faux ! Avec Linux, un PC peut continuer...",
      "category": "os",
      "difficulty": "facile"
    }
  ]
}
```

**Usage Frontend** : Page `/quiz`, chargé une fois au début

---

#### 3️⃣ POST /api/simulation-runs/
**Rôle** : Enregistrer les résultats d'une simulation complétée

**Requête** :
```json
{
  "score_cost": 85,
  "score_ecology": 90,
  "score_autonomy": 95,
  "score_inclusion": 80,
  "choices": {
    "os": 2,
    "office": 4,
    "storage": 6,
    "renewal": 8
  },
  "profile": "resistant"
}
```

**Réponse** :
```json
{
  "id": 123,
  "created_at": "2024-12-04T16:30:00Z",
  "score_cost": 85,
  "score_ecology": 90,
  "score_autonomy": 95,
  "score_inclusion": 80,
  "profile": "resistant",
  "message": "Simulation enregistrée avec succès!"
}
```

**Usage Frontend** : Appelé automatiquement à la fin de la simulation

---

#### 5️⃣ POST /api/ideas/
**Rôle** : Soumettre une nouvelle idée

**Requête** :
```json
{
  "title": "Créer un club Linux",
  "description": "Organiser un club où les élèves...",
  "author_name": "Marie Dupont",
  "school_name": "Lycée Victor Hugo, Paris"
}
```

**Réponse** :
```json
{
  "id": 42,
  "title": "Créer un club Linux",
  "description": "Organiser un club où les élèves...",
  "author_name": "Marie Dupont",
  "school_name": "Lycée Victor Hugo, Paris",
  "is_approved": false,
  "created_at": "2024-12-04T17:00:00Z"
}
```

**Usage Frontend** : Formulaire sur la page `/ressources`

---

#### 6️⃣ GET /api/ideas/
**Rôle** : Récupérer les idées approuvées

**Paramètres** :
- `?is_approved=true` - Filtre uniquement les idées approuvées (recommandé pour le front)

**Réponse** :
```json
{
  "count": 5,
  "results": [
    {
      "id": 1,
      "title": "Club Linux au lycée",
      "description": "Créer un club informatique...",
      "author_name": "Marie Dupont",
      "school_name": "Lycée Victor Hugo, Paris",
      "is_approved": true,
      "created_at": "2024-11-15T10:30:00Z"
    }
  ]
}
```

**Usage Frontend** : Page `/ressources`, affichage des idées de la communauté

---

### ⭐ BONUS (optionnels mais utiles)

#### 3️⃣ GET /api/options/
**Rôle** : Lister toutes les options (debug/admin)

**Pas utilisé côté frontend pour le moment**

---

#### 4️⃣ GET /api/simulation-runs/
**Rôle** : Statistiques des simulations

**Paramètres** :
- `?limit=50` - Nombre max de résultats

**Réponse** :
```json
{
  "count": 892,
  "results": [
    {
      "id": 1,
      "created_at": "2024-12-04T10:30:00Z",
      "score_cost": 85,
      "score_ecology": 90,
      "score_autonomy": 95,
      "score_inclusion": 80,
      "profile": "resistant"
    }
  ]
}
```

**Usage potentiel** : Page stats globales (à créer)

---

#### 7️⃣ PATCH /api/ideas/<id>/
**Rôle** : Valider une idée (admin)

**Pas utilisé côté frontend - Interface admin uniquement**

---

#### 8️⃣ GET /api/resources/
**Rôle** : Ressources pédagogiques

**Réponse** :
```json
{
  "count": 8,
  "results": [
    {
      "id": 1,
      "title": "Installer Linux dans votre établissement",
      "type": "guide",
      "url": "https://example.com/guide-linux",
      "description": "Guide complet...",
      "tags": ["linux", "installation"]
    }
  ]
}
```

**Usage Frontend** : Page `/ressources`, onglet "Ressources"
**Note** : Actuellement utilise les données mockup de `mockData.ts`

---

#### 9️⃣ GET /api/health/
**Rôle** : Vérifier que l'API fonctionne

**Réponse** :
```json
{
  "status": "ok",
  "message": "API Backend Django is running",
  "timestamp": "2024-12-04T16:30:00Z"
}
```

**Usage Frontend** : Test de connexion au démarrage

---

## 🔧 Configuration Frontend

### 1. Variables d'environnement

Créer `.env` à la racine :

```env
# URL de l'API Django Backend
VITE_API_URL=http://localhost:8000/api

# Mode mockup (true = données fictives, false = vraie API)
VITE_USE_MOCK=true
```

### 2. Passer du mockup à la vraie API

**Fichier** : `src/services/djangoApi.ts`

```typescript
// Ligne 13 : Changer cette valeur
const USE_MOCK = false; // true = mockup, false = vraie API
```

### 3. Configuration CORS Django

Dans votre `settings.py` :

```python
INSTALLED_APPS = [
    # ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ...
]

# Développement
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://localhost:8081",
    "http://localhost:3000",
]

# Production
CORS_ALLOWED_ORIGINS = [
    "https://votre-domaine-frontend.com",
]
```

---

## 🧪 Tests d'intégration

### Test manuel rapide

1. **Démarrer le backend Django** :
   ```bash
   python manage.py runserver
   ```

2. **Démarrer le frontend** :
   ```bash
   cd nuit_front
   npm run dev
   ```

3. **Tester les endpoints** :
   - Ouvrir http://localhost:8081
   - **Quiz** : Aller sur `/quiz` - Devrait charger les questions
   - **Simulation** : Aller sur `/simulation` - Devrait charger les catégories
   - **Idées** : Aller sur `/ressources` - Remplir le formulaire

### Vérification dans la console

Ouvrir les DevTools (F12) :
```javascript
// Vérifier que les appels API fonctionnent
// Les erreurs 404 ou CORS apparaîtront en rouge
```

---

## 📝 Checklist d'intégration

### Backend (Django)

- [ ] Implémenter `GET /api/categories/`
- [ ] Implémenter `GET /api/quiz/`
- [ ] Implémenter `POST /api/simulation-runs/`
- [ ] Implémenter `POST /api/ideas/`
- [ ] Implémenter `GET /api/ideas/?is_approved=true`
- [ ] Configurer CORS
- [ ] Tester chaque endpoint avec Postman/Thunder Client
- [ ] Vérifier que les formats JSON correspondent exactement
- [ ] (Bonus) Implémenter `GET /api/resources/`
- [ ] (Bonus) Implémenter `GET /api/health/`

### Frontend (React)

- [x] Types TypeScript définis
- [x] Services API avec mockup
- [x] Page Quiz fonctionnelle
- [x] Page Simulation intégrée
- [x] Formulaire d'idées
- [x] Affichage des idées
- [ ] Modifier `USE_MOCK` à `false` dans `djangoApi.ts`
- [ ] Configurer `.env` avec l'URL de l'API
- [ ] Tester toutes les fonctionnalités
- [ ] Gérer les erreurs réseau
- [ ] Déployer en production

---

## 🚨 Problèmes courants

### Erreur CORS
```
Access to fetch at 'http://localhost:8000/api/...' has been blocked by CORS policy
```
**Solution** : Vérifier la configuration CORS dans Django `settings.py`

### Erreur 404
```
GET http://localhost:8000/api/categories/ 404 (Not Found)
```
**Solution** : L'endpoint n'existe pas encore dans Django ou l'URL est incorrecte

### Données ne s'affichent pas
```
TypeError: Cannot read property 'map' of undefined
```
**Solution** : Le format JSON ne correspond pas aux types TypeScript. Vérifier la structure exacte.

---

## 📁 Fichiers importants

### Frontend
- `src/services/djangoApi.ts` - Service API (à modifier pour USE_MOCK = false)
- `src/services/djangoMockData.ts` - Données mockup
- `src/types/api.ts` - Types TypeScript (correspondent à Django)
- `src/pages/Quiz.tsx` - Page Quiz
- `src/components/IdeaForm.tsx` - Formulaire d'idées
- `.env` - Configuration (à créer)

### Backend (à créer côté Django)
- `views/categories.py` - Endpoint GET /api/categories/
- `views/quiz.py` - Endpoint GET /api/quiz/
- `views/simulation_runs.py` - Endpoints simulation
- `views/ideas.py` - Endpoints idées
- `serializers/` - Sérialiseurs Django REST Framework
- `models/` - Modèles de base de données

---

## 🎉 Quand tout fonctionne

Une fois l'intégration terminée, vous aurez :

1. ✅ **Quiz interactif** avec vrai/faux
2. ✅ **Simulation complète** avec choix et impacts
3. ✅ **Formulaire d'idées** fonctionnel
4. ✅ **Affichage des idées** de la communauté
5. ✅ **Sauvegarde automatique** des simulations
6. ✅ **(Bonus)** Ressources pédagogiques
7. ✅ **(Bonus)** Statistiques globales

---

## 🤝 Contact

**Questions sur le frontend** : Voir README.md

**Questions sur l'API** : Contacter l'équipe backend Django

**Format des données** : Se référer à ce document (INTEGRATION_DJANGO_API.md)

---

**Bonne intégration ! 🚀**
