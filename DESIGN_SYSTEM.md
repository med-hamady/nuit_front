# 🎨 Design System - Mon Lycée Résistant

## Vue d'ensemble

Ce document définit les règles de design strictes pour garantir la cohérence visuelle et faciliter le développement.

---

## 🎨 Palette de Couleurs

### Couleurs Principales

| Nom | Usage | HSL | Hex Approx | Preview |
|-----|-------|-----|------------|---------|
| **Primary** | Actions positives, écologie, NIRD | `152° 60% 36%` | `#2D8659` | 🟢 |
| **Primary Light** | Hover states, backgrounds | `152° 55% 50%` | `#40B378` | 🟢 |
| **Primary Dark** | Active states, emphasis | `152° 65% 25%` | `#1D5C3C` | 🟢 |
| **Secondary** | Communauté, transition | `28° 70% 55%` | `#DD8639` | 🟠 |
| **Accent** | Inclusion, technologie | `200° 75% 55%` | `#2FBFDF` | 🔵 |
| **Destructive** | Big Tech, dépendance | `0° 60% 50%` | `#CC3333` | 🔴 |

### Couleurs Structurelles

| Nom | Usage | HSL Light | HSL Dark |
|-----|-------|-----------|----------|
| **Background** | Fond principal | `40° 30% 97%` | `220° 20% 12%` |
| **Card** | Fond des cards | `40° 40% 99%` | `220° 20% 15%` |
| **Muted** | Backgrounds secondaires | `150° 15% 92%` | `220° 15% 20%` |
| **Border** | Bordures | `150° 20% 85%` | `220° 15% 25%` |
| **Foreground** | Texte principal | `220° 25% 20%` | `40° 20% 95%` |
| **Muted Foreground** | Texte secondaire | `220° 15% 45%` | `220° 15% 65%` |

### Couleurs des Jauges

| Jauge | Emoji | Couleur | HSL |
|-------|-------|---------|-----|
| Coût maîtrisé | 💰 | Yellow | `45° 85% 55%` |
| Impact écologique | 🌍 | Green | `152° 60% 40%` |
| Autonomie | 🔓 | Blue | `200° 75% 50%` |
| Inclusion | 👥 | Blue-light | `200° 75% 50%` |

---

## 📝 Typographie

### Famille de Polices

```css
/* Headings - Títulos, Encabezados */
font-family: 'Nunito', system-ui, sans-serif;
weights: 400, 500, 600, 700, 800

/* Body - Texto normal */
font-family: 'Quicksand', system-ui, sans-serif;
weights: 400, 500, 600
```

### Hiérarchie des Titres

| Élément | Taille | Poids | Line Height | Usage |
|---------|--------|-------|-------------|-------|
| **H1** | `text-3xl md:text-4xl` (1.875rem / 2.25rem) | `font-bold` (700) | `leading-tight` | Titre de page |
| **H2** | `text-2xl md:text-3xl` (1.5rem / 1.875rem) | `font-bold` (700) | `leading-tight` | Titre de section |
| **H3** | `text-xl` (1.25rem) | `font-bold` (700) | Normal | Titre de card/bloc |
| **Body Large** | `text-lg` (1.125rem) | `font-medium` (500) | `leading-relaxed` | Texte important |
| **Body** | `text-base` (1rem) | Normal (400) | Normal | Texte standard |
| **Small** | `text-sm` (0.875rem) | Normal (400) | Normal | Légendes, helper text |
| **XSmall** | `text-xs` (0.75rem) | `font-medium` (500) | Normal | Tags, labels |

---

## 📦 Composants

### Cards

#### Structure Standard
```tsx
<div className="p-6 bg-card border-2 border-border rounded-2xl shadow-building">
  {/* Contenu */}
</div>
```

#### Variants

| Variant | Classes | Usage |
|---------|---------|-------|
| **Default** | `border-border bg-card` | Card standard |
| **Primary** | `border-primary/20 bg-primary/5` | Mise en avant positive |
| **Success** | `border-primary/30 bg-primary/5 shadow-building-hover` | État complété/réussi |
| **Warning** | `border-secondary/30 bg-secondary/5` | Transition, attention |
| **Danger** | `border-destructive/30 bg-destructive/5` | Problème, dépendance |

#### Règles Strictes
- ✅ **Padding** : toujours `p-6` (24px) ou `p-5` (20px) pour les plus petites
- ✅ **Border radius** : `rounded-2xl` (16px)
- ✅ **Border width** : `border-2` (2px) ou `border` (1px)
- ✅ **Shadow** : `shadow-building` par défaut, `shadow-building-hover` au hover

### Buttons

#### Variants Disponibles

```tsx
// Hero - CTA principal
<Button variant="hero" size="xl">Commencer l'aventure</Button>

// Default - Action standard
<Button variant="default">Continuer</Button>

// Outline - Action secondaire
<Button variant="outline">Annuler</Button>

// Ghost - Action discrète
<Button variant="ghost">Retour</Button>
```

#### Sizes

| Size | Height | Padding | Text Size | Usage |
|------|--------|---------|-----------|-------|
| `xl` | 56px | 40px H | `text-lg` | CTA principal |
| `lg` | 48px | 32px H | `text-base` | Actions importantes |
| `default` | 40px | 20px H | `text-sm` | Actions standard |
| `sm` | 36px | 16px H | `text-sm` | Actions compactes |

### Jauges (Gauges)

#### Structure
```tsx
<GaugeDisplay 
  label="Coût maîtrisé"
  value={75}  // 0-100
  emoji="💰"
  colorClass="text-yellow-500"
/>
```

#### Règles
- ✅ Toujours entre 0 et 100
- ✅ Animation de remplissage : `transition-all duration-500`
- ✅ Arrondi : `rounded-full`
- ✅ Hauteur : `h-3` (12px)

### Choice Cards

#### Structure
```tsx
<ChoiceCard
  title="Titre"
  description="Description courte"
  tags={[
    { label: 'Tag', variant: 'positive' }
  ]}
  isSelected={boolean}
  onClick={() => {}}
/>
```

#### États
- **Normal** : `border-border` avec `hover:border-primary/50`
- **Selected** : `border-primary bg-primary/5` avec check icon
- **Hover** : `hover:-translate-y-0.5` et `shadow-building`

---

## 🎭 Espacement

### Principe : Échelle Tailwind (4px base)

| Nom | Valeur | Pixels | Usage |
|-----|--------|--------|-------|
| `gap-2` | 0.5rem | 8px | Éléments très proches |
| `gap-3` | 0.75rem | 12px | Spacing interne (icon-text) |
| `gap-4` | 1rem | 16px | Grid de cards |
| `gap-6` | 1.5rem | 24px | Sections dans une card |
| `gap-8` | 2rem | 32px | Entre cards |
| `gap-12` | 3rem | 48px | Entre grandes sections |

### Padding & Margin Standards

| Élément | Padding/Margin | Justification |
|---------|----------------|---------------|
| **Card** | `p-6` | Standard pour lisibilité |
| **Section** | `py-8 md:py-12` | Respiration verticale |
| **Container** | `px-4` | Marges latérales mobiles |
| **Grid** | `gap-4` ou `gap-6` | Selon densité |

---

##  🎬 Animations

### Animations Disponibles

| Nom | Keyframes | Duration | Usage |
|-----|-----------|----------|-------|
| `animate-slide-up` | `translateY(20px)` → `translateY(0)` | 0.4s | Apparition d'éléments |
| `animate-fade-in` | `opacity: 0` → `opacity: 1` | 0.3s | Fade in simple |
| `animate-bounce-in` | Scale 0.3 → 1.05 → 0.9 → 1 | 0.5s | Élément impactant |
| `animate-gauge` | `width: 0%` → `width: X%` | 1s | Remplissage de jauge |
| `animate-float` | `translateY(0)` → `-10px` → `0` | 3s (infinite) | Flottement doux |

### Delays d'Animation
Pour échelonner les animations :
```tsx
style={{ animationDelay: '0.1s' }}
style={{ animationDelay: '0.15s' }}
style={{ animationDelay: '0.2s' }}
```

### Transitions
```css
/* Standard */
transition-all duration-200

/* Smooth pour les jauges */
transition-all duration-500 ease-out

/* Hover effects */
hover:-translate-y-0.5
hover:scale-105
hover:shadow-building-hover
```

---

## 🌈 Dégradés (Gradients)

### Gradients Prédéfinis

```css
/* Hero - Primary to Accent */
.bg-hero-gradient {
  background: linear-gradient(135deg, 
    hsl(152 60% 36%) 0%, 
    hsl(152 55% 45%) 50%, 
    hsl(200 75% 55%) 100%
  );
}

/* Big Tech - Dark gradient */
.bg-bigtech-gradient {
  background: linear-gradient(135deg, 
    hsl(250 30% 25%) 0%, 
    hsl(250 35% 15%) 100%
  );
}

/* Sky - Light blue */
.bg-village-sky {
  background: linear-gradient(180deg, 
    hsl(200 80% 85%) 0%, 
    hsl(200 70% 92%) 100%
  );
}
```

---

## 🔧 Shadows

### Box Shadows Personnalisées

| Nom | Valeur | Usage |
|-----|--------|-------|
| `shadow-village` | `0 8px 32px -8px hsl(var(--primary) / 0.15)` | Cards importantes |
| `shadow-village-lg` | `0 16px 48px -12px hsl(var(--primary) / 0.2)` | Hero sections |
| `shadow-building` | `0 4px 16px -4px hsl(var(--foreground) / 0.1)` | Cards standard |
| `shadow-building-hover` | `0 8px 24px -4px hsl(var(--primary) / 0.25)` | Hover state |
| `shadow-glow` | `0 0 20px hsl(var(--primary) / 0.3)` | Effets spéciaux |

---

## 📐 Border Radius

| Classe | Valeur | Usage |
|--------|--------|-------|
| `rounded-lg` | 0.75rem (12px) | Petits éléments |
| `rounded-xl` | 1rem (16px) | Buttons, chips |
| `rounded-2xl` | 1.25rem (20px) | Cards, sections |
| `rounded-full` | 50% | Badges, avatars, jauges |

---

## ✅ Checklist de Cohérence

Avant de commit un nouveau composant, vérifier :

- [ ] Utilise les **couleurs du design system** (pas de couleurs arbitraires)
- [ ] Respecte la **hiérarchie typographique**
- [ ] Padding/Margin cohérents avec les **standards d'espacement**
- [ ] Animations avec **delays appropriés** si multiples éléments
- [ ] Border radius **cohérent** avec le type d'élément
- [ ] Shadows **prédéfinies** uniquement
- [ ] Transitions **smooth** et pas trop rapides (<300ms)
- [ ] **Responsive** (mobile-first avec breakpoints md:, lg:)
- [ ] **Accessibilité** (contraste, aria-labels si besoin)

---

## 🎯 Principes de Design

1. **Air & Respiration** : Ne jamais hésiter à ajouter du padding
2. **Cohérence** : Utiliser toujours les mêmes patterns pour les mêmes éléments
3. **Hiérarchie Visuelle** : Les éléments importants doivent se démarquer
4. **Feedback** : Chaque action doit avoir une réponse visuelle
5. **Performance** : Préférer les transitions CSS aux animations JS
6. **Simplicité** : Less is more - éviter de surcharger

---

<div align="center">

**Design System maintenu par Layer3_Squad**  
*Version 1.0 - Nuit de l'Info 2025*

</div>
