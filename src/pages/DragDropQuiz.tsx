import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { DRAG_DROP_QUESTIONS, CATEGORY_INFO, DragDropAnswer } from '@/data/dragDropContent';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, useSensor, useSensors, PointerSensor, KeyboardSensor, closestCenter, useDraggable, useDroppable } from '@dnd-kit/core';

type CategoryType = 'true' | 'false';

const DragDropQuiz = () => {
    const navigate = useNavigate();

    // Flatten all statements into a single array for "one by one" flow
    const [allStatements, setAllStatements] = useState<DragDropAnswer[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    // State for the current interaction
    const [droppedCategory, setDroppedCategory] = useState<CategoryType | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [draggingItem, setDraggingItem] = useState<DragDropAnswer | null>(null);

    // Initialize statements on mount
    useEffect(() => {
        const flat = DRAG_DROP_QUESTIONS.flatMap(q => q.answers);
        setAllStatements(flat);
    }, []);

    const currentStatement = allStatements[currentIndex];

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor)
    );

    const handleDragStart = (event: DragStartEvent) => {
        setDraggingItem(currentStatement);
    };

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { over } = event;
        setDraggingItem(null);

        if (!over) return;

        const targetCategory = over.id as CategoryType;
        setDroppedCategory(targetCategory);

        const correct = currentStatement.correctCategory === targetCategory;
        setIsCorrect(correct);

        if (correct) {
            setScore(prev => prev + 1);
        }
    }, [currentStatement]);

    const nextQuestion = () => {
        if (currentIndex < allStatements.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setDroppedCategory(null);
            setIsCorrect(null);
        } else {
            setShowResults(true);
        }
    };

    const resetQuiz = () => {
        setCurrentIndex(0);
        setScore(0);
        setShowResults(false);
        setDroppedCategory(null);
        setIsCorrect(null);
    };

    const percentage = Math.round((score / allStatements.length) * 100);

    if (showResults) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center py-12 px-4">
                    <div className="max-w-2xl w-full text-center space-y-8 animate-slide-up">
                        <div className="relative">
                            <Trophy className="w-24 h-24 mx-auto text-primary animate-bounce-in" />
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                            Quiz Terminé ! 🎉
                        </h1>

                        <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-building">
                            <p className="text-6xl font-bold text-primary mb-2">{percentage}%</p>
                            <p className="text-muted-foreground mb-4">
                                {score} / {allStatements.length} réponses correctes
                            </p>

                            <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-1000 ease-out"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>

                            <p className="mt-6 text-foreground font-medium">
                                {percentage >= 80 ? '🌟 Excellent ! Tu maîtrises le numérique responsable !' :
                                    percentage >= 60 ? '👍 Très bien ! Tu es sur la bonne voie !' :
                                        percentage >= 40 ? '💪 Pas mal ! Continue à apprendre !' :
                                            '📚 C\'est un bon début ! Explore les ressources pour progresser.'}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={resetQuiz}
                                className="gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Recommencer
                            </Button>
                            <Button
                                variant="hero"
                                size="lg"
                                onClick={() => navigate('/ressources')}
                                className="gap-2"
                            >
                                Explorer les ressources
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!currentStatement) return null;

    return (
        <Layout>
            <div className="py-8 md:py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-8 animate-slide-up">
                        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                            Quiz Drag & Drop 🎯
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Glisse l'affirmation vers Vrai ou Faux
                        </p>

                        {/* Progress */}
                        <div className="mt-6 max-w-xl mx-auto">
                            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                                    style={{ width: `${((currentIndex) / allStatements.length) * 100}%` }}
                                />
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Question {currentIndex + 1} / {allStatements.length}
                            </p>
                        </div>
                    </div>

                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <div className="max-w-2xl mx-auto space-y-8">

                            {/* Draggable Card Area */}
                            <div className="min-h-[200px] flex items-center justify-center">
                                {!droppedCategory ? (
                                    <DraggableCard answer={currentStatement} />
                                ) : (
                                    <div className={`w-full p-6 rounded-xl border-2 text-center animate-in fade-in zoom-in ${isCorrect
                                            ? 'bg-secondary/10 border-secondary'
                                            : 'bg-accent/10 border-accent'
                                        }`}>
                                        <div className="flex flex-col items-center gap-4">
                                            {isCorrect ? (
                                                <>
                                                    <CheckCircle2 className="w-16 h-16 text-secondary" />
                                                    <h3 className="text-2xl font-bold text-secondary">Correct !</h3>
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="w-16 h-16 text-accent" />
                                                    <h3 className="text-2xl font-bold text-accent">Incorrect</h3>
                                                    <p className="text-muted-foreground">
                                                        C'était {currentStatement.correctCategory === 'true' ? 'Vrai' : 'Faux'}
                                                    </p>
                                                </>
                                            )}

                                            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border mt-2">
                                                <span className="text-3xl">{currentStatement.emoji}</span>
                                                <p className="font-medium text-foreground">{currentStatement.text}</p>
                                            </div>

                                            <Button
                                                size="lg"
                                                onClick={nextQuestion}
                                                className="mt-4"
                                                variant={isCorrect ? "default" : "secondary"}
                                            >
                                                Question Suivante <ArrowRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Drop Zones */}
                            {!droppedCategory && (
                                <div className="grid grid-cols-2 gap-4 md:gap-8">
                                    <DropZone category="true" />
                                    <DropZone category="false" />
                                </div>
                            )}

                        </div>

                        <DragOverlay>
                            {draggingItem ? (
                                <div className="bg-card border-2 border-primary rounded-xl p-6 shadow-2xl rotate-3 cursor-grabbing w-[300px]">
                                    <div className="flex flex-col items-center gap-3 text-center">
                                        <span className="text-4xl">{draggingItem.emoji}</span>
                                        <p className="font-medium text-foreground text-lg">{draggingItem.text}</p>
                                    </div>
                                </div>
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                </div>
            </div>
        </Layout>
    );
};

// Draggable Card Component
const DraggableCard = ({ answer }: { answer: DragDropAnswer }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: answer.id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`bg-card border-2 border-border rounded-xl p-8 shadow-building cursor-grab active:cursor-grabbing hover:border-primary hover:shadow-lg transition-all w-full max-w-md mx-auto ${isDragging ? 'opacity-0' : 'opacity-100'
                }`}
        >
            <div className="flex flex-col items-center gap-4 text-center">
                <span className="text-5xl mb-2">{answer.emoji}</span>
                <p className="text-xl font-medium text-foreground leading-relaxed">
                    {answer.text}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                    Glisse-moi vers Vrai ou Faux
                </p>
            </div>
        </div>
    );
};

// Drop Zone Component
const DropZone = ({ category }: { category: 'true' | 'false' }) => {
    const { setNodeRef, isOver } = useDroppable({ id: category });
    const info = CATEGORY_INFO[category];

    return (
        <div
            ref={setNodeRef}
            className={`h-48 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4 ${isOver
                    ? category === 'true'
                        ? 'border-secondary bg-secondary/10 scale-105'
                        : 'border-accent bg-accent/10 scale-105'
                    : category === 'true'
                        ? 'border-secondary/30 hover:border-secondary/60 hover:bg-secondary/5'
                        : 'border-accent/30 hover:border-accent/60 hover:bg-accent/5'
                }`}
        >
            <span className={`text-4xl ${isOver ? 'scale-110 transition-transform' : ''}`}>
                {category === 'true' ? '👍' : '👎'}
            </span>
            <h3 className={`text-2xl font-bold ${category === 'true' ? 'text-secondary' : 'text-accent'
                }`}>
                {info.label}
            </h3>
        </div>
    );
};

export default DragDropQuiz;
