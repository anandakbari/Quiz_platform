import React, { useState } from 'react';
import { useQuizStore } from '../lib/store';
import { cn } from '../lib/utils';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { MultipleChoiceQuestion, IntegerQuestion } from '../lib/utils';

export const QuizQuestion: React.FC = () => {
  const { questions, currentQuestion, answers, setAnswer } = useQuizStore();
  const question = questions[currentQuestion];
  const selectedAnswer = answers[question.id];
  const isAnswered = selectedAnswer !== undefined;
  const [integerAnswer, setIntegerAnswer] = useState('');
  const [error, setError] = useState('');

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== undefined) return;
    setAnswer(question.id, index);
  };

  const handleIntegerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAnswer !== undefined) return;

    const numAnswer = parseInt(integerAnswer, 10);
    if (isNaN(numAnswer)) {
      setError('Please enter a valid number');
      return;
    }
    
    setError('');
    setAnswer(question.id, numAnswer);
  };

  const isCorrect = selectedAnswer === (question as MultipleChoiceQuestion | IntegerQuestion).correctAnswer;

  if (question.type === 'integer') {
    return (
      <div className="w-full max-w-2xl mx-auto animate-fade-in">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100">{question.question}</h2>
        
        {!isAnswered ? (
          <form onSubmit={handleIntegerSubmit} className="space-y-4">
            <div className="glass-card p-6 rounded-xl">
              <input
                type="number"
                value={integerAnswer}
                onChange={(e) => {
                  setIntegerAnswer(e.target.value);
                  setError('');
                }}
                className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none py-2 text-lg text-gray-800 dark:text-gray-100"
                placeholder="Enter your answer..."
              />
              {error && (
                <p className="text-red-500 dark:text-red-400 mt-2 text-sm">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500/90 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-600/90 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            >
              Submit Answer
            </button>
          </form>
        ) : (
          <div className={cn(
            'glass-card p-6 rounded-xl animate-fade-in',
            isCorrect 
              ? 'bg-green-50 dark:bg-black border-green-500/30' 
              : 'bg-red-50 dark:bg-black border-red-500/30'
          )}>
            <div className="flex items-center gap-3 mb-4">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400" />
                  <p className="font-semibold text-green-700 dark:text-green-400">Correct!</p>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-500 dark:text-red-400" />
                  <p className="font-semibold text-red-700 dark:text-red-400">Incorrect!</p>
                </>
              )}
            </div>
            <div className="flex justify-between items-center text-lg">
              <p>Your answer: <span className="font-semibold">{selectedAnswer}</span></p>
              {!isCorrect && (
                <p className="text-gray-600 dark:text-gray-300">
                  Correct answer: <span className="font-semibold">{question.correctAnswer}</span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100">{question.question}</h2>
      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectAnswer = index === question.correctAnswer;
          
          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
              className={cn(
                'w-full p-6 text-left rounded-xl transition-all duration-300 transform hover:scale-[1.01] relative option-card',
                'font-medium text-lg glass-card',
                isAnswered ? (
                  isCorrectAnswer
                    ? 'bg-green-50 dark:bg-black border-green-500/30 text-green-700 dark:text-green-400'
                    : isSelected
                      ? 'bg-red-50 dark:bg-black border-red-500/30 text-red-700 dark:text-red-400'
                      : 'bg-gray-50 dark:bg-black border-gray-700/50 text-gray-500 dark:text-gray-400'
                ) : (
                  'hover:bg-white/90 dark:hover:bg-gray-900/40 text-gray-800 dark:text-gray-100 dark:border-gray-700/50'
                ),
                'animate-scale-in'
              )}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={cn(
                    'w-2 h-2 rounded-full mr-4 transition-colors duration-300',
                    isAnswered ? (
                      isCorrectAnswer
                        ? 'bg-green-500'
                        : isSelected
                          ? 'bg-red-500'
                          : 'bg-gray-700'
                    ) : 'bg-gray-700 group-hover:bg-indigo-500'
                  )} />
                  <span>{option}</span>
                </div>
                {isAnswered && (isSelected || isCorrectAnswer) && (
                  <div className="flex items-center animate-fade-in">
                    {isCorrectAnswer ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400 ml-2" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 dark:text-red-400 ml-2" />
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className={cn(
          'mt-6 p-6 rounded-xl animate-fade-in glass-card',
          isCorrect 
            ? 'bg-green-50 dark:bg-black border-green-500/30' 
            : 'bg-red-50 dark:bg-black border-red-500/30'
        )}>
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400" />
                <p className="font-semibold text-green-700 dark:text-green-400">Correct!</p>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-500 dark:text-red-400" />
                <p className="font-semibold text-red-700 dark:text-red-400">Incorrect!</p>
              </>
            )}
          </div>
          <p className={cn(
            'mt-2',
            isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          )}>
            {isCorrect
              ? "Great job! That's the right answer."
              : `The correct answer is "${question.options[question.correctAnswer]}".`}
          </p>
        </div>
      )}
    </div>
  );
};