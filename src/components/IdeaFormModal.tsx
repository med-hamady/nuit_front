import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { X, Lightbulb } from 'lucide-react';
import { IdeaForm } from '@/components/IdeaForm';

export function IdeaFormModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button to open modal */}
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Lightbulb className="w-4 h-4" />
        <span className="hidden md:inline">Proposer une idée</span>
      </Button>

      {/* Modal rendered in portal */}
      {isOpen && createPortal(
        <>
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-all duration-300"
            style={{ zIndex: 99998 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 overflow-y-auto" style={{ zIndex: 99999 }}>
            <div className="min-h-full flex items-center justify-center p-4 py-8">
              <div className="w-full max-w-4xl relative">
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-2 -right-2 z-20 p-3 bg-card hover:bg-muted border-2 border-border rounded-full transition-all hover:rotate-90 duration-300 shadow-xl"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* IdeaForm component */}
                <IdeaForm />
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
