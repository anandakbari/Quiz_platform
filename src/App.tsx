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

  // Prevent initial transition flicker
  useEffect(() => {
    document.documentElement.classList.add('no-transitions');
    
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('no-transitions');
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  // Pre-load questions
  useEffect(() => {
    if (!isQuizActive) {
      const shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);
      setQuestions(shuffledQuestions);
    }
  }, [isQuizActive, setQuestions]);

  const startQuiz = () => {
    requestAnimationFrame(() => {
      setQuizActive(true);
      setTimeRemaining(30);
      setCurrentQuestion(0);
      setScore(0);
    });
  };

  const handleNextQuestion = () => {
    const timeTaken = 30 - timeRemaining;
    setTimeForQuestion(questions[currentQuestion].id, timeTaken);
    
    if (currentQuestion < questions.length - 1) {
      requestAnimationFrame(() => {
        setCurrentQuestion(currentQuestion + 1);
        setTimeRemaining(30);
      });
    }
  };

  // Handle time out
  useEffect(() => {
    if (timeRemaining === 0 && isQuizActive) {
      setTimeForQuestion(questions[currentQuestion].id, 30);
      
      if (answers[questions[currentQuestion].id] === undefined) {
        const question = questions[currentQuestion];
        const defaultAnswer = question.type === 'multiple-choice' ? -1 : 0;
        setAnswer(question.id, defaultAnswer);
      }
      
      if (currentQuestion < questions.length - 1) {
        handleNextQuestion();
      }
    }
  }, [timeRemaining, isQuizActive, currentQuestion, questions, answers, setAnswer, setTimeForQuestion]);

  // Update score
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

  // Start screen
  if (!isQuizActive) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-hidden">
        <ThemeToggle />
        <div className="dark:hidden fixed inset-0 pointer-events-none">
          <GradientBackground />
        </div>
        <div className="hidden dark:block fixed inset-0 pointer-events-none">
          <DarkGradientBackground />
        </div>
        <div className="max-w-md w-full relative">
          <div className="glass-card p-8 rounded-2xl shadow-xl">
            <div className="relative">
              <Brain className="w-20 h-20 mx-auto mb-6 text-indigo-500/90" />
              <Sparkles className="w-6 h-6 text-yellow-400 absolute top-0 right-1/4" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              Quiz Challenge
            </h1>
            
            <div className="mb-8 p-4 glass-card rounded-xl">
              <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
                Instructions:
              </h2>
              <ol className="space-y-2 text-gray-600 dark:text-gray-300 list-decimal list-inside">
                <li>For multiple-choice questions, select the one best answer (A, B, C, or D).</li>
                <li>For integer-type questions, write your numerical answer clearly.</li>
                <li>No calculators unless specified.</li>
                <li>You have 30 seconds per question to complete this quiz.</li>
              </ol>
            </div>

            <button
              onClick={startQuiz}
              className="w-full bg-indigo-500/90 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-600/90 transition-colors duration-200"
            >
              Start Quiz
            </button>
          </div>
          <QuizHistory />
        </div>
      </div>
    );
  }

  // Results screen
  if (currentQuestion >= questions.length || Object.keys(answers).length === questions.length) {
    return (
      <div className="fixed inset-0">
        <ThemeToggle />
        <div className="dark:hidden fixed inset-0 pointer-events-none">
          <GradientBackground />
        </div>
        <div className="hidden dark:block fixed inset-0 pointer-events-none">
          <DarkGradientBackground />
        </div>
        <QuizResults />
      </div>
    );
  }

  // Quiz screen
  return (
    <div className="fixed inset-0 p-4">
      <ThemeToggle />
      <div className="dark:hidden fixed inset-0 pointer-events-none">
        <GradientBackground />
      </div>
      <div className="hidden dark:block fixed inset-0 pointer-events-none">
        <DarkGradientBackground />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="glass-card rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex justify-between items-center mb-8">
            <QuizTimer />
            <QuizProgress />
          </div>
          <QuizQuestion />
        </div>
        {answers[questions[currentQuestion].id] !== undefined && (
          <div className="flex justify-end">
            <button
              onClick={handleNextQuestion}
              className="bg-indigo-500/90 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-600/90 transition-colors duration-200"
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