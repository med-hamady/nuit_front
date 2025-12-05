import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
    dyslexicFont: boolean;
    toggleDyslexicFont: () => void;
    highContrast: boolean;
    toggleHighContrast: () => void;
    textSize: 'normal' | 'large' | 'xl';
    setTextSize: (size: 'normal' | 'large' | 'xl') => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
    // Activer la police dyslexique et la grande taille de texte par défaut
    const [dyslexicFont, setDyslexicFont] = useState(true);
    const [highContrast, setHighContrast] = useState(false);
    const [textSize, setTextSize] = useState<'normal' | 'large' | 'xl'>('large');

    useEffect(() => {
        // Appliquer les classes au body
        const body = document.body;

        if (dyslexicFont) body.classList.add('font-dyslexic');
        else body.classList.remove('font-dyslexic');

        if (highContrast) body.classList.add('high-contrast');
        else body.classList.remove('high-contrast');

        body.classList.remove('text-size-large', 'text-size-xl');
        if (textSize === 'large') body.classList.add('text-size-large');
        if (textSize === 'xl') body.classList.add('text-size-xl');

    }, [dyslexicFont, highContrast, textSize]);

    return (
        <AccessibilityContext.Provider
            value={{
                dyslexicFont,
                toggleDyslexicFont: () => setDyslexicFont(prev => !prev),
                highContrast,
                toggleHighContrast: () => setHighContrast(prev => !prev),
                textSize,
                setTextSize,
            }}
        >
            {children}
        </AccessibilityContext.Provider>
    );
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext);
    if (context === undefined) {
        throw new Error('useAccessibility must be used within an AccessibilityProvider');
    }
    return context;
}
