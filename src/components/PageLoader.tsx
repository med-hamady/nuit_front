import { Loader2 } from 'lucide-react';

export function PageLoader() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4 animate-pulse">
                <div className="p-4 bg-primary/10 rounded-full">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
                <p className="text-muted-foreground font-medium text-sm">
                    Chargement du village...
                </p>
            </div>
        </div>
    );
}
