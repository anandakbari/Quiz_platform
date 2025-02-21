import React, { useEffect, useState } from 'react';
import { useQuizStore } from '../lib/store';
import { saveQuizAttempt } from '../lib/db';
import { Award, Clock, Trophy, Target } from 'lucide-react';

export const QuizResults: React.FC = () => {
  const { score, questions, timePerQuestion, resetQuiz } = useQuizStore();
  const [saveError, setSaveError] = useState<string | null>(null);
  const percentage = (score / questions.length) * 100;
  const averageTime = Math.round(
    Object.values(timePerQuestion).reduce((a, b) => a + b, 0) / questions.length
  );

  useEffect(() => {
    const saveResults = async () => {
      try {
        const saved = await saveQuizAttempt({
          timestamp: Date.now(),
          score,
          totalQuestions: questions.length,
          timePerQuestion,
        });
        
        if (!saved) {
          setSaveError('Failed to save quiz results. Your score might not appear in history.');
        }
      } catch (err) {
        console.error('Error saving quiz results:', err);
        setSaveError('Failed to save quiz results. Your score might not appear in history.');
      }
    };
    saveResults();
  }, [score, questions.length, timePerQuestion]);

  const handleReset = () => {
    resetQuiz();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in px-4 sm:px-6">
        <div className="glass-card p-6 sm:p-8 rounded-2xl">
          {saveError && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm sm:text-base">
              {saveError}
            </div>
          )}
          
          <div className="relative mb-6 sm:mb-8">
            <Award className="w-20 sm:w-24 h-20 sm:h-24 mx-auto text-indigo-500 dark:text-indigo-400 animate-pulse-once" />
            <Trophy className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-400 absolute top-0 right-1/4 animate-bounce" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-400 text-center">
            Quiz Complete!
          </h2>
          
          <div className="text-4xl sm:text-6xl font-bold mb-6 sm:mb-8 animate-scale-in text-gray-800 dark:text-gray-100 text-center">
            {Math.round(percentage)}%
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="glass-card p-4 sm:p-6 rounded-xl animate-fade-in text-center" style={{ animationDelay: '200ms' }}>
              <Target className="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2 text-indigo-500 dark:text-indigo-400" />
              <div className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">{score}</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Correct Answers</div>
            </div>
            
            <div className="glass-card p-4 sm:p-6 rounded-xl animate-fade-in text-center" style={{ animationDelay: '400ms' }}>
              <Clock className="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2 text-indigo-500 dark:text-indigo-400" />
              <div className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">{averageTime}s</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Avg. Time per Question</div>
            </div>
          </div>
          
          <button
            onClick={handleReset}
            className="w-full bg-gradient-to-r from-indigo-500 to-indigo-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:from-indigo-600 hover:to-indigo-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};