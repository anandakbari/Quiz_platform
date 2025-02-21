import React from 'react';
import { useQuizStore } from '../lib/store';
import { saveQuizAttempt } from '../lib/db';
import { Award, Clock, Trophy, Target } from 'lucide-react';

export const QuizResults: React.FC = () => {
  const { score, questions, timePerQuestion, resetQuiz } = useQuizStore();
  const percentage = (score / questions.length) * 100;
  const averageTime = Math.round(
    Object.values(timePerQuestion).reduce((a, b) => a + b, 0) / questions.length
  );

  React.useEffect(() => {
    saveQuizAttempt({
      timestamp: Date.now(),
      score,
      totalQuestions: questions.length,
      timePerQuestion,
    });
  }, []);

  const handleReset = () => {
    resetQuiz();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        <div className="glass-card p-8 rounded-2xl">
          <div className="relative mb-8">
            <Award className="w-24 h-24 mx-auto text-indigo-500 dark:text-indigo-400 animate-pulse-once" />
            <Trophy className="w-8 h-8 text-yellow-400 absolute top-0 right-1/4 animate-bounce" />
          </div>
          
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-400">
            Quiz Complete!
          </h2>
          
          <div className="text-6xl font-bold mb-8 animate-scale-in text-gray-800 dark:text-gray-100">
            {Math.round(percentage)}%
          </div>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: '200ms' }}>
              <Target className="w-8 h-8 mx-auto mb-2 text-indigo-500 dark:text-indigo-400" />
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{score}</div>
              <div className="text-gray-600 dark:text-gray-300">Correct Answers</div>
            </div>
            
            <div className="glass-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Clock className="w-8 h-8 mx-auto mb-2 text-indigo-500 dark:text-indigo-400" />
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{averageTime}s</div>
              <div className="text-gray-600 dark:text-gray-300">Avg. Time per Question</div>
            </div>
          </div>
          
          <button
            onClick={handleReset}
            className="w-full bg-gradient-to-r from-indigo-500 to-indigo-400 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-600 hover:to-indigo-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};