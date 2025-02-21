import React from 'react';
import { useQuizStore } from '../lib/store';

export const QuizProgress: React.FC = () => {
  const { currentQuestion, questions } = useQuizStore();
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="w-full sm:max-w-md">
      <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-300 mb-2">
        <span>Question {currentQuestion + 1} of {questions.length}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full h-2 sm:h-3 glass-card rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500/90 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};