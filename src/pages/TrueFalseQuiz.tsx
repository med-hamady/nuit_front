import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy, RefreshCw, CheckCircle2, XCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { TRUE_FALSE_QUESTIONS, TrueFalseStatement } from '@/data/trueFalseContent';

const TrueFalseQuiz = () => {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [answered, setAnswered] = useState(false);

    const currentQuestion = TRUE_FALSE_QUESTIONS[currentQuestionIndex];
    const currentStatement = currentQuestion.statements[currentStatementIndex];

    // Calculate total statements across all questions
    const totalStatements = TRUE_FALSE_QUESTIONS.reduce((sum, q) => sum + q.statements.length, 0);
    const currentStatementNumber = TRUE_FALSE_QUESTIONS
        .slice(0, currentQuestionIndex)
        .reduce((sum, q) => sum + q.statements.length, 0) + currentStatementIndex + 1;

    const handleAnswer = (answer: boolean) => {
        setUserAnswer(answer);
        setAnswered(true);

        if (answer === currentStatement.isTrue) {
            setScore(prev => prev + 1);
        }
    };

    const nextStatement = () => {
        // Check if there are more statements in current question
        if (currentStatementIndex < currentQuestion.statements.length - 1) {
            setCurrentStatementIndex(prev => prev + 1);
            setUserAnswer(null);
            setAnswered(false);
        } else {
            // Check if there are more questions
            if (currentQuestionIndex < TRUE_FALSE_QUESTIONS.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setCurrentStatementIndex(0);
                setUserAnswer(null);
                setAnswered(false);
            } else {
                // Quiz completed
                setShowResults(true);
            }
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setCurrentStatementIndex(0);
        setUserAnswer(null);
        setScore(0);
        setShowResults(false);
        setAnswered(false);
    };

    const percentage = Math.round((score / totalStatements) * 100);

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
                                {score} / {totalStatements} réponses correctes
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

    return (
        <Layout>
            <div className="py-8 md:py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-8 animate-slide-up">
                        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                            Quiz Vrai ou Faux 🎯
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Teste tes connaissances sur le numérique responsable
                        </p>

                        {/* Progress */}
                        <div className="mt-6 max-w-xl mx-auto">
                            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                                    style={{ width: `${(currentStatementNumber / totalStatements) * 100}%` }}
                                />
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Question {currentStatementNumber} / {totalStatements}
                            </p>
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-building animate-slide-up">
                        {/* Question Header */}
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                            <span className="text-4xl">{currentQuestion.icon}</span>
                            <div>
                                <h2 className="text-xl font-heading font-bold text-foreground">
                                    {currentQuestion.title}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {currentQuestion.description}
                                </p>
                            </div>
                        </div>

                        {/* Statement */}
                        <div className="mb-8">
                            <div className="flex items-start gap-4 mb-6">
                                <span className="text-5xl mt-2">{currentStatement.emoji}</span>
                                <p className="text-2xl font-medium text-foreground leading-relaxed">
                                    {currentStatement.statement}
                                </p>
                            </div>
                        </div>

                        {/* Answer Buttons */}
                        {!answered ? (
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => handleAnswer(true)}
                                    className="h-20 text-xl font-semibold gap-3 hover:bg-secondary/20 hover:border-secondary transition-all"
                                >
                                    <ThumbsUp className="w-6 h-6" />
                                    Vrai
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => handleAnswer(false)}
                                    className="h-20 text-xl font-semibold gap-3 hover:bg-accent/20 hover:border-accent transition-all"
                                >
                                    <ThumbsDown className="w-6 h-6" />
                                    Faux
                                </Button>
                            </div>
                        ) : (
                            <>
                                {/* Feedback */}
                                <div className={`p-6 rounded-xl mb-6 border-2 ${userAnswer === currentStatement.isTrue
                                        ? 'bg-secondary/10 border-secondary'
                                        : 'bg-accent/10 border-accent'
                                    }`}>
                                    <div className="flex items-center gap-3 mb-3">
                                        {userAnswer === currentStatement.isTrue ? (
                                            <>
                                                <CheckCircle2 className="w-8 h-8 text-secondary flex-shrink-0" />
                                                <p className="text-xl font-bold text-secondary">Bonne réponse ! 🎉</p>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="w-8 h-8 text-accent flex-shrink-0" />
                                                <p className="text-xl font-bold text-accent">Pas tout à fait...</p>
                                            </>
                                        )}
                                    </div>
                                    <p className="text-foreground leading-relaxed">
                                        {currentStatement.explanation}
                                    </p>
                                </div>

                                {/* Next Button */}
                                <Button
                                    variant="hero"
                                    size="lg"
                                    className="w-full gap-2"
                                    onClick={nextStatement}
                                >
                                    {currentQuestionIndex === TRUE_FALSE_QUESTIONS.length - 1 &&
                                        currentStatementIndex === currentQuestion.statements.length - 1
                                        ? 'Voir mes résultats'
                                        : 'Question suivante'}
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Score Display */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Score actuel : <span className="font-bold text-primary">{score}</span> / {currentStatementNumber - (answered ? 0 : 1)}
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TrueFalseQuiz;
