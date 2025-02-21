import React, { useEffect, useState } from 'react';
import { getQuizAttempts, type QuizAttempt } from '../lib/db';
import { Clock, Target } from 'lucide-react';

export const QuizHistory: React.FC = () => {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  useEffect(() => {
    const loadAttempts = async () => {
      const history = await getQuizAttempts();
      setAttempts(history.sort((a, b) => b.timestamp - a.timestamp));
    };
    loadAttempts();
  }, []);

  if (attempts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 glass-card p-6 rounded-2xl">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Previous Attempts</h3>
      <div className="space-y-4">
        {attempts.map((attempt, index) => {
          const date = new Date(attempt.timestamp);
          const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
          const averageTime = Math.round(
            Object.values(attempt.timePerQuestion).reduce((a, b) => a + b, 0) / attempt.totalQuestions
          );

          return (
            <div 
              key={attempt.id || index}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                </span>
                <span className="text-lg font-bold text-indigo-500 dark:text-indigo-400">{percentage}%</span>
              </div>
              <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-1 text-indigo-500 dark:text-indigo-400" />
                  <span>{attempt.score}/{attempt.totalQuestions} correct</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-indigo-500 dark:text-indigo-400" />
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