import React, { useEffect, useState } from 'react';
import { getQuizAttempts, type QuizAttempt } from '../lib/db';
import { Clock, Target } from 'lucide-react';

export const QuizHistory: React.FC = () => {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAttempts = async () => {
      try {
        setIsLoading(true);
        const history = await getQuizAttempts();
        setAttempts(history.sort((a, b) => b.timestamp - a.timestamp));
        setError(null);
      } catch (err) {
        console.error('Failed to load quiz history:', err);
        setError('Failed to load quiz history. Please try refreshing the page.');
      } finally {
        setIsLoading(false);
      }
    };
    loadAttempts();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-6 sm:mt-8 glass-card p-4 sm:p-6 rounded-2xl">
        <div className="animate-pulse space-y-3 sm:space-y-4">
          <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="space-y-2 sm:space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 sm:h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 sm:mt-8 glass-card p-4 sm:p-6 rounded-2xl">
        <div className="text-red-500 dark:text-red-400 text-sm sm:text-base">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (attempts.length === 0) {
    return (
      <div className="mt-6 sm:mt-8 glass-card p-4 sm:p-6 rounded-2xl">
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base text-center">No quiz attempts yet. Start a quiz to see your history!</p>
      </div>
    );
  }

  return (
    <div className="mt-6 sm:mt-8 glass-card p-4 sm:p-6 rounded-2xl">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Previous Attempts</h3>
      <div className="space-y-3 sm:space-y-4">
        {attempts.map((attempt, index) => {
          const date = new Date(attempt.timestamp);
          const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
          const averageTime = Math.round(
            Object.values(attempt.timePerQuestion).reduce((a, b) => a + b, 0) / attempt.totalQuestions
          );

          return (
            <div 
              key={attempt.id || index}
              className="glass-card rounded-xl p-3 sm:p-4 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1 sm:gap-0">
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                </span>
                <span className="text-base sm:text-lg font-bold text-indigo-500 dark:text-indigo-400">{percentage}%</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <Target className="w-3 sm:w-4 h-3 sm:h-4 mr-1 text-indigo-500 dark:text-indigo-400" />
                  <span>{attempt.score}/{attempt.totalQuestions} correct</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 sm:w-4 h-3 sm:h-4 mr-1 text-indigo-500 dark:text-indigo-400" />
                  <span>{averageTime}s avg. time</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};