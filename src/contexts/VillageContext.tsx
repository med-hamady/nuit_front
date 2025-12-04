import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Gauges {
  cost: number;       // Coût maîtrisé 💰
  ecology: number;    // Impact écologique 🌍
  autonomy: number;   // Autonomie numérique 🔓
  inclusion: number;  // Inclusion 👥
}

export interface Choices {
  os: 'windows' | 'linux' | null;
  office: 'microsoft' | 'libreoffice' | null;
  storage: 'bigtech' | 'european' | null;
  renewal: 'replace' | 'reuse' | null;
}

interface VillageContextType {
  gauges: Gauges;
  choices: Choices;
  setChoice: (category: keyof Choices, value: string) => void;
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

const initialChoices: Choices = {
  os: null,
  office: null,
  storage: null,
  renewal: null,
};

// Impact de chaque choix sur les jauges
const choiceImpacts: Record<string, Record<string, Partial<Gauges>>> = {
  os: {
    windows: { cost: -20, ecology: -25, autonomy: -30, inclusion: 0 },
    linux: { cost: 30, ecology: 35, autonomy: 40, inclusion: 10 },
  },
  office: {
    microsoft: { cost: -15, ecology: -5, autonomy: -25, inclusion: -5 },
    libreoffice: { cost: 25, ecology: 10, autonomy: 35, inclusion: 15 },
  },
  storage: {
    bigtech: { cost: -10, ecology: -15, autonomy: -35, inclusion: -10 },
    european: { cost: 15, ecology: 20, autonomy: 30, inclusion: 20 },
  },
  renewal: {
    replace: { cost: -25, ecology: -40, autonomy: -10, inclusion: 0 },
    reuse: { cost: 30, ecology: 45, autonomy: 15, inclusion: 10 },
  },
};

const VillageContext = createContext<VillageContextType | undefined>(undefined);

export function VillageProvider({ children }: { children: ReactNode }) {
  const [choices, setChoices] = useState<Choices>(initialChoices);

  const calculateGauges = (currentChoices: Choices): Gauges => {
    const gauges = { ...initialGauges };
    
    Object.entries(currentChoices).forEach(([category, value]) => {
      if (value && choiceImpacts[category]?.[value]) {
        const impact = choiceImpacts[category][value];
        Object.entries(impact).forEach(([gauge, delta]) => {
          gauges[gauge as keyof Gauges] = Math.max(0, Math.min(100, gauges[gauge as keyof Gauges] + (delta || 0)));
        });
      }
    });
    
    return gauges;
  };

  const gauges = calculateGauges(choices);

  const setChoice = (category: keyof Choices, value: string) => {
    setChoices(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  const getProfile = (): 'resistant' | 'transition' | 'dependent' => {
    const avg = (gauges.cost + gauges.ecology + gauges.autonomy + gauges.inclusion) / 4;
    if (avg >= 70) return 'resistant';
    if (avg >= 45) return 'transition';
    return 'dependent';
  };

  const resetChoices = () => {
    setChoices(initialChoices);
  };

  const allChoicesMade = Object.values(choices).every(v => v !== null);

  return (
    <VillageContext.Provider
      value={{
        gauges,
        choices,
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
