import React, { useEffect, useRef, useState } from 'react';
import { Clock } from 'lucide-react';
import { useQuizStore } from '../lib/store';
import { cn } from '../lib/utils';

export const QuizTimer = () => {
  const {
    timeRemaining,
    setTimeRemaining,
    currentQuestion,
    isQuizActive,
    questions
  } = useQuizStore();
  
  const startTimeRef = useRef(Date.now());
  const timerIdRef = useRef<number | null>(null);
  const [displayTime, setDisplayTime] = useState(timeRemaining);
  
  useEffect(() => {
    startTimeRef.current = Date.now();
    setDisplayTime(timeRemaining);
  }, [timeRemaining, currentQuestion]);

  useEffect(() => {
    if (!isQuizActive || currentQuestion >= questions.length) {
      return;
    }

    const updateTimer = () => {
      const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const newTime = Math.max(timeRemaining - elapsedTime, 0);
      
      setDisplayTime(newTime);
      
      if (newTime === 0) {
        if (timerIdRef.current) {
          cancelAnimationFrame(timerIdRef.current);
          timerIdRef.current = null;
        }
        setTimeRemaining(0);
        return;
      }
      
      timerIdRef.current = requestAnimationFrame(updateTimer);
    };

    timerIdRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (timerIdRef.current) {
        cancelAnimationFrame(timerIdRef.current);
        timerIdRef.current = null;
      }
    };
  }, [isQuizActive, currentQuestion, timeRemaining, questions.length, setTimeRemaining]);

  const circumference = 2 * Math.PI * 11;
  const strokeDashoffset = circumference * (1 - displayTime / 30);
  const isLowTime = displayTime <= 5;

  return (
    <div className={cn(
      "glass-card px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2 sm:gap-3",
      isLowTime && "animate-pulse"
    )}>
      <div className="relative">
        <Clock className={cn(
          "w-5 sm:w-6 h-5 sm:h-6",
          isLowTime ? "text-red-400" : "text-indigo-500/90"
        )} />
        <svg
          className="absolute top-0 left-0 -rotate-90 w-5 sm:w-6 h-5 sm:h-6"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-700/20"
          />
          <circle
            cx="12"
            cy="12"
            r="11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={cn(
              "transition-all duration-300",
              isLowTime ? "text-red-400" : "text-indigo-500/90"
            )}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
      </div>
      <span className={cn(
        "font-mono font-bold text-sm sm:text-base transition-colors duration-300",
        isLowTime ? "text-red-400" : "text-indigo-500/90"
      )}>
        {displayTime}s
      </span>
    </div>
  );
};