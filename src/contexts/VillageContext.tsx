import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCategories } from '@/services/djangoApi';
import type { Category, Option } from '@/types/api';
import { SIMULATION_CHOICES } from '@/data/simulationContent';

export interface Gauges {
  cost: number;       // Coût maîtrisé 💰
  ecology: number;    // Impact écologique 🌍
  autonomy: number;   // Autonomie numérique 🔓
  inclusion: number;  // Inclusion 👥
}

// Choix : map de slug de catégorie -> ID d'option
export type Choices = Record<string, number | null>;

interface VillageContextType {
  gauges: Gauges;
  choices: Choices;
  categories: Category[];
  isLoadingCategories: boolean;
  setChoice: (categorySlug: string, optionId: number) => void;
  getProfile: () => 'resistant' | 'transition' | 'dependent';
  resetChoices: () => void;
  allChoicesMade: boolean;
}

const initialGauges: Gauges = {
  cost: 50,
  ecology: 50,
  autonomy: 50,
  inclusion: 50,
};

const VillageContext = createContext<VillageContextType | undefined>(undefined);

export function VillageProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [choices, setChoices] = useState<Choices>({});

  // Charger les catégories au démarrage
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await getCategories();

        if (response.categories && response.categories.length > 0) {
          setCategories(response.categories);

          // Initialiser les choix avec null pour chaque catégorie
          const initialChoices: Choices = {};
          response.categories.forEach(cat => {
            // Utiliser slug si disponible, sinon convertir l'ID en string
            const key = cat.slug || String(cat.id);
            initialChoices[key] = null;
          });
          setChoices(initialChoices);
        } else {
          throw new Error('No categories from API');
        }
      } catch (error) {
        console.error('⚠️ Erreur API, utilisation des données locales:', error);
        setCategories([]);

        // Fallback: utiliser les données locales
        const initialChoices: Choices = {};
        SIMULATION_CHOICES.forEach(cat => {
          initialChoices[cat.id] = null;
        });
        setChoices(initialChoices);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  // Calculer les jauges en fonction des choix
  const calculateGauges = (currentChoices: Choices): Gauges => {
    const gauges = { ...initialGauges };

    // Utiliser les catégories de l'API si disponibles, sinon fallback
    const sourceCategories = categories.length > 0 ? categories : SIMULATION_CHOICES;

    Object.entries(currentChoices).forEach(([categoryKey, optionId]) => {
      if (optionId === null) return;

      // Trouver la catégorie (par slug pour API, par id pour données locales)
      const category = sourceCategories.find(cat =>
        (cat.slug && cat.slug === categoryKey) || String(cat.id) === categoryKey
      );

      if (!category) return;

      // Trouver l'option sélectionnée
      const option = category.options.find(opt => opt.id === optionId);
      if (!option) return;

      // Si c'est depuis l'API, utiliser les impacts
      if ('impact_cost' in option) {
        gauges.cost = Math.max(0, Math.min(100, gauges.cost + (option.impact_cost / 2)));
        gauges.ecology = Math.max(0, Math.min(100, gauges.ecology + (option.impact_ecology / 2)));
        gauges.autonomy = Math.max(0, Math.min(100, gauges.autonomy + (option.impact_autonomy / 2)));
        gauges.inclusion = Math.max(0, Math.min(100, gauges.inclusion + (option.impact_inclusion / 2)));
      }
    });

    return gauges;
  };

  const gauges = calculateGauges(choices);

  const setChoice = (categorySlug: string, optionId: number) => {
    setChoices(prev => ({
      ...prev,
      [categorySlug]: optionId,
    }));
  };

  const getProfile = (): 'resistant' | 'transition' | 'dependent' => {
    const avg = (gauges.cost + gauges.ecology + gauges.autonomy + gauges.inclusion) / 4;
    if (avg >= 70) return 'resistant';
    if (avg >= 45) return 'transition';
    return 'dependent';
  };

  const resetChoices = () => {
    const resetChoices: Choices = {};
    const sourceCategories = categories.length > 0 ? categories : SIMULATION_CHOICES;
    sourceCategories.forEach(cat => {
      const key = cat.slug || String(cat.id);
      resetChoices[key] = null;
    });
    setChoices(resetChoices);
  };

  const allChoicesMade = Object.values(choices).every(v => v !== null);

  return (
    <VillageContext.Provider
      value={{
        gauges,
        choices,
        categories,
        isLoadingCategories,
        setChoice,
        getProfile,
        resetChoices,
        allChoicesMade,
      }}
    >
      {children}
    </VillageContext.Provider>
  );
}

export function useVillage() {
  const context = useContext(VillageContext);
  if (context === undefined) {
    throw new Error('useVillage must be used within a VillageProvider');
  }
  return context;
}
