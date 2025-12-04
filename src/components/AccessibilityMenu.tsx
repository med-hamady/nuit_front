import { useState } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { Settings, Type, Eye, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AccessibilityMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const {
        dyslexicFont, toggleDyslexicFont,
        highContrast, toggleHighContrast,
        textSize, setTextSize
    } = useAccessibility();

    return (
        <div className="fixed bottom-4 left-4 z-50">
            {/* Toggle Button */}
            <Button
                variant="outline"
                size="icon"
                className={cn(
                    "rounded-full shadow-lg w-12 h-12 bg-background border-2 transition-all duration-300",
                    isOpen ? "rotate-90 bg-primary text-primary-foreground border-primary" : "border-primary/50 hover:border-primary"
                )}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Ouvrir le menu d'accessibilité"
                aria-expanded={isOpen}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Settings className="w-6 h-6" />}
            </Button>

            {/* Menu Content */}
            <div
                className={cn(
                    "absolute bottom-16 left-0 bg-card border-2 border-border rounded-2xl shadow-xl p-4 w-72 space-y-4 transition-all duration-300 origin-bottom-left",
                    isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
                )}
                role="dialog"
                aria-label="Options d'accessibilité"
            >
                <h3 className="font-heading font-bold text-lg flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Accessibilité
                </h3>

                {/* Dyslexic Font */}
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Police adaptée</p>
                    <Button
                        variant={dyslexicFont ? "default" : "outline"}
                        className="w-full justify-start gap-2 overflow-hidden"
                        onClick={toggleDyslexicFont}
                        aria-pressed={dyslexicFont}
                    >
                        <Type className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{dyslexicFont ? "Désactiver" : "Activer"}</span>
                    </Button>
                </div>

                {/* High Contrast */}
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Contraste</p>
                    <Button
                        variant={highContrast ? "default" : "outline"}
                        className="w-full justify-start gap-2 overflow-hidden"
                        onClick={toggleHighContrast}
                        aria-pressed={highContrast}
                    >
                        <Eye className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{highContrast ? "Désactiver" : "Activer"}</span>
                    </Button>
                </div>

                {/* Text Size */}
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Taille du texte</p>
                    <div className="flex gap-2">
                        <Button
                            variant={textSize === 'normal' ? "default" : "outline"}
                            size="sm"
                            className="flex-1"
                            onClick={() => setTextSize('normal')}
                            aria-label="Taille de texte normale"
                            aria-pressed={textSize === 'normal'}
                        >
                            A
                        </Button>
                        <Button
                            variant={textSize === 'large' ? "default" : "outline"}
                            size="sm"
                            className="flex-1 text-lg"
                            onClick={() => setTextSize('large')}
                            aria-label="Taille de texte grande"
                            aria-pressed={textSize === 'large'}
                        >
                            A+
                        </Button>
                        <Button
                            variant={textSize === 'xl' ? "default" : "outline"}
                            size="sm"
                            className="flex-1 text-xl"
                            onClick={() => setTextSize('xl')}
                            aria-label="Taille de texte très grande"
                            aria-pressed={textSize === 'xl'}
                        >
                            A++
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
