import React, { useEffect } from 'react';
import { Brain, Sparkles } from 'lucide-react';
import { useQuizStore } from './lib/store';
import { QuizTimer } from './components/QuizTimer';
import { QuizProgress } from './components/QuizProgress';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResults } from './components/QuizResults';
import { QuizHistory } from './components/QuizHistory';
import { ThemeToggle } from './components/ThemeToggle';
import GradientBackground from './components/GradientBackground';
import DarkGradientBackground from './components/DarkGradientBackground';
import { quizQuestions } from './lib/utils';

function App() {
  const {
    isQuizActive,
    setQuizActive,
    questions,
    setQuestions,
    currentQuestion,
    setCurrentQuestion,
    timeRemaining,
    setTimeRemaining,
    answers,
    score,
    setScore,
    setAnswer,
    setTimeForQuestion,
  } = useQuizStore();

  useEffect(() => {
    if (!isQuizActive) {
      // Shuffle questions when starting a new quiz
      const shuffledQuestions = [...quizQuestions]
        .sort(() => Math.random() - 0.5);
      setQuestions(shuffledQuestions);
    }
  }, [isQuizActive, setQuestions]);

  const startQuiz = () => {
    setQuizActive(true);
    setTimeRemaining(30);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleNextQuestion = () => {
    // Save the time taken for the current question
    const timeTaken = 30 - timeRemaining;
    setTimeForQuestion(questions[currentQuestion].id, timeTaken);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeRemaining(30);
    }
  };

  useEffect(() => {
    if (timeRemaining === 0 && isQuizActive) {
      // Save the time taken (full 30 seconds) when time runs out
      setTimeForQuestion(questions[currentQuestion].id, 30);
      
      // If time runs out and no answer was provided, submit a default answer
      if (answers[questions[currentQuestion].id] === undefined) {
        const question = questions[currentQuestion];
        // For multiple choice, submit -1 (incorrect)
        // For integer questions, submit 0 (likely incorrect)
        const defaultAnswer = question.type === 'multiple-choice' ? -1 : 0;
        setAnswer(question.id, defaultAnswer);
      }
      
      // If this is not the last question, move to the next one
      if (currentQuestion < questions.length - 1) {
        handleNextQuestion();
      }
    }
  }, [timeRemaining, isQuizActive, currentQuestion, questions, answers, setAnswer, setTimeForQuestion]);

  useEffect(() => {
    if (isQuizActive) {
      const currentScore = Object.entries(answers).reduce(
        (acc, [questionId, answer]) => {
          const question = questions.find((q) => q.id === Number(questionId));
          return question?.correctAnswer === answer ? acc + 1 : acc;
        },
        0
      );
      setScore(currentScore);
    }
  }, [answers, isQuizActive, questions, setScore]);

  if (!isQuizActive) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <ThemeToggle />
        <div className="dark:hidden">
          <GradientBackground />
        </div>
        <div className="hidden dark:block">
          <DarkGradientBackground />
        </div>
        <div className="max-w-md w-full px-4 sm:px-0">
          <div className="glass-card p-6 sm:p-8 rounded-2xl shadow-xl animate-fade-in">
            <div className="relative">
              <Brain className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 sm:mb-6 text-indigo-500/90 animate-pulse-once" />
              <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-400 absolute top-0 right-1/4 animate-pulse" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 dark:text-white text-center">
              Quiz Challenge
            </h1>
            
            {/* Instructions */}
            <div className="mb-6 sm:mb-8 p-4 glass-card rounded-xl">
              <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">Instructions:</h2>
              <ol className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 list-decimal list-inside">
                <li>For multiple-choice questions, select the one best answer (A, B, C, or D).</li>
                <li>For integer-type questions, write your numerical answer clearly.</li>
                <li>No calculators unless specified.</li>
                <li>You have 30 seconds per question to complete this quiz.</li>
              </ol>
            </div>

            <button
              onClick={startQuiz}
              className="w-full bg-indigo-500/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-indigo-600/90 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            >
              Start Quiz
            </button>
          </div>
          <QuizHistory />
        </div>
      </div>
    );
  }

  if (currentQuestion >= questions.length || Object.keys(answers).length === questions.length) {
    return (
      <>
        <ThemeToggle />
        <div className="dark:hidden">
          <GradientBackground />
        </div>
        <div className="hidden dark:block">
          <DarkGradientBackground />
        </div>
        <QuizResults />
      </>
    );
  }

  return (
    <div className="min-h-screen p-4 animate-fade-in">
      <ThemeToggle />
      <div className="dark:hidden">
        <GradientBackground />
      </div>
      <div className="hidden dark:block">
        <DarkGradientBackground />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Add quiz-content class here */}
        <div className="glass-card rounded-2xl shadow-xl p-4 sm:p-8 mb-4 sm:mb-6 quiz-content">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8 mb-6 sm:mb-8">
            <QuizTimer />
            <QuizProgress />
          </div>
          <QuizQuestion />
        </div>
        {answers[questions[currentQuestion].id] !== undefined && (
          <div className="flex justify-end animate-slide-in quiz-content">
            <button
              onClick={handleNextQuestion}
              className="w-full sm:w-auto bg-indigo-500/90 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-indigo-600/90 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;