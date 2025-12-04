import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VillageProvider } from "@/contexts/VillageContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { PageLoader } from "@/components/PageLoader";
import { AccessibilityMenu } from "@/components/AccessibilityMenu";

// Lazy loading des pages pour optimiser la performance initiale
const Index = lazy(() => import("./pages/Index"));
const Simulation = lazy(() => import("./pages/Simulation"));
const DragDropQuiz = lazy(() => import("./pages/DragDropQuiz"));
const Resultats = lazy(() => import("./pages/Resultats"));
const Ressources = lazy(() => import("./pages/Ressources"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AccessibilityProvider>
        <VillageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Skip to content link for keyboard users */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Aller au contenu principal
            </a>

            <AccessibilityMenu />

            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/simulation" element={<Simulation />} />
                <Route path="/quiz" element={<DragDropQuiz />} />
                <Route path="/resultats" element={<Resultats />} />
                <Route path="/ressources" element={<Ressources />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </VillageProvider>
      </AccessibilityProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
