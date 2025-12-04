# 🏫 Mon Lycée Résistant - Village Numérique NIRD

[![Nuit de l'Info 2025](https://img.shields.io/badge/Nuit%20de%20l'Info-2025-blue)](https://www.nuitdelinfo.com)
[![NIRD](https://img.shields.io/badge/Inspiré%20par-NIRD-green)](https://nird.forge.apps.education.fr)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org)

> Application web ludique et pédagogique pour sensibiliser les établissements scolaires au numérique responsable, durable et inclusif.

## 🎯 Concept

**Tu es chef d'établissement.** Tes décisions numériques influencent :
- 💰 Le coût maîtrisé  
- 🌍 L'impact écologique  
- 🔓 L'autonomie numérique  
- 👥 L'inclusion

Inspiré par la démarche **NIRD** (Numérique Inclusif, Responsable et Durable), cette application te permet de simuler différents choix numériques pour ton lycée et d'observer en temps réel leur impact sur 4 axes fondamentaux.

---

## ✨ Fonctionnalités

### 📚 **Page d'Accueil**
- Présentation du concept "Village Numérique Résistant"
- Explication du problème (dépendance Big Tech) et de la solution (NIRD)
- 3 piliers NIRD : Inclusion, Responsabilité, Durabilité

### 🎮 **Simulation Interactive**
- **4 catégories de choix** :
  1. Système d'exploitation (Windows 11 vs Linux)
  2. Suite bureautique (Microsoft Office vs LibreOffice)
  3. Stockage des données (Cloud Big Tech vs Hébergeur européen)
  4. Politique de renouvellement matériel

- **Guidage visuel** : indicateur de progression 1/4, 2/4, 3/4, 4/4
- **Feedback immédiat** : jauges animées en temps réel
- **Micro-interactions** : bordures colorées, animations au survol

### 📊 **Résultats & Profil**
- 3 profils possibles :
  - 🌱 **Très résistant** (moyenne ≥ 70/100)
  - ✨ **En bonne transition** (moyenne 45-69/100)
  - 😬 **Très dépendant** (moyenne < 45/100)

- Analyse détaillée de chaque choix
- 5 actions concrètes pour passer à l'action

### 🌱 **Ressources NIRD**
- Idées d'ateliers et projets pédagogiques
- Liens vers la documentation NIRD
- Call-to-action pour rejoindre la communauté

---

## 🏗️ Architecture

### **Stack Technique**
- **Framework** : React 18.3 + Vite 5.4
- **Language** : TypeScript 5.8  
- **Styling** : TailwindCSS 3.4 + Custom Design System
- **UI Components** : shadcn/ui (Radix UI)
- **State Management** : React Context API
- **Routing** : React Router v6

### **Structure du Projet**

```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # shadcn/ui components
│   ├── Layout.tsx      # Structure globale
│   ├── Header.tsx      # Navigation
│   ├── TopBar.tsx      # Liens externes
│   ├── Footer.tsx      # Pied de page
│   ├── GaugesPanel.tsx # Panneau des 4 jauges
│   ├── GaugeDisplay.tsx# Jauge individuelle
│   └── ChoiceCard.tsx  # Carte de choix
│
├── contexts/           # React Context
│   └── VillageContext.tsx  # État global de la simulation
│
├── data/               # Séparation contenu/logique ✨
│   ├── constants.ts    # URLs, branding, piliers NIRD
│   └── simulationContent.ts  # Choix, textes, ressources
│
├── pages/              # Pages de l'application
│   ├── Index.tsx       # Accueil
│   ├── Simulation.tsx  # Simulation interactive
│   ├── Resultats.tsx   # Bilan personnalisé
│   ├── Ressources.tsx  # Ressources NIRD
│   └── NotFound.tsx    # 404
│
└── index.css           # Design system global
```

---

## 🎨 Design System

### **Palette de Couleurs**

| Couleur | Usage | HSL |
|---------|-------|-----|
| **Primary** (Vert forêt) | Écologie, durabilité, actions positives | `152° 60% 36%` |
| **Secondary** (Terre chaude) | Communauté, chaleur, transition | `28° 70% 55%` |
| **Accent** (Bleu ciel) | Inclusion, ouverture, technologie | `200° 75% 55%` |
| **Destructive** (Rouge) | Big Tech, dépendance, actions négatives | `0° 60% 50%` |

### **Typographies**
- **Headings** : Nunito (700, 800)
- **Body** : Quicksand (400, 500, 600)

### **Composants**
- **Jauges** : Barres horizontales animées (0-100)
- **Cards** : Bordures arrondies `1rem`, ombre `shadow-building`
- **Buttons** : 
  - `hero` → Gradient primary-accent
  - `outline` → Bordure primary
  - `default` → Fond primary

### **Animations**
- `slide-up` : Apparition progressive (0.4s)
- `fade-in` : Opacité 0→1 (0.3s)
- `gauge-fill` : Remplissage de jauge (1s)
- `bounce-in` : Effet rebond (0.5s)

---

## 🚀 Performance & Optimisation

### **Conception Optimisée**

✅ **Gestion minimale de l'état**  
Un seul Context global pour les choix utilisateur. Le reste est statique.

✅ **Découpage intelligent**  
- Contenu séparé de la logique (`/data` folder)
- Calculs ultra-légers (4 additions pour les scores)
- Pas de frameworks lourds de data-viz

✅ **Médias optimisés**  
- Emojis natifs (pas d'images)
- Dégradés CSS (pas de backgrounds complexes)
- SVG pour les icônes (Lucide React)

✅ **Extensibilité**  
Architecture modulaire permettant d'ajouter facilement :
- De nouvelles catégories de choix
- De nouveaux profils
- Du contenu NIRD

---

## 📦 Installation & Lancement

### **Prérequis**
- Node.js 18+ ou Bun

### **Installation**

```bash
# Cloner le repository
git clone https://github.com/Hadrami41/village-num-rique-libre.git
cd village-num-rique-libre

# Installer les dépendances
npm install
# ou
bun install
```

### **Développement**

```bash
# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:8080
```

### **Production**

```bash
# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
```

---

## 🎓 Pédagogie & UX

### **Guidage Utilisateur**
- Indicateur de progression visuel (1/4, 2/4...)
- Messages contextuels ("Choisis une option...")
- Feedback immédiat sur chaque action

### **Micro-copies**
- Ton positif et encourageant
- Vocabulaire cohérent (lycée, chef d'établissement, village)
- Emojis pour les repères visuels

### **Accessibilité**
- Contrastes respectés (WCAG AA)
- `, emojis avec `aria-label`
- Navigation au clavier

---

## 👥 Équipe

**Layer3_Squad** - Nuit de l'Info 2025

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- **NIRD** pour l'inspiration et la vision d'un numérique plus responsable
- **Nuit de l'Info** pour ce défi stimulant
- La communauté open-source pour les outils exceptionnels

---

## 🔗 Liens Utiles

- [Site NIRD](https://nird.forge.apps.education.fr)
- [Nuit de l'Info](https://www.nuitdelinfo.com)
- [GitHub du projet](https://github.com/Hadrami41/village-num-rique-libre)

---

<div align="center">

**Conçu avec 💚 pour un numérique plus inclusif, responsable et durable**

</div>
