import { create } from 'zustand';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizState {
  currentQuestion: number;
  score: number;
  timeRemaining: number;
  questions: Question[];
  answers: Record<number, number>;
  isQuizActive: boolean;
  timePerQuestion: Record<number, number>;
  setCurrentQuestion: (questionIndex: number) => void;
  setScore: (score: number) => void;
  setTimeRemaining: (time: number) => void;
  setQuestions: (questions: Question[]) => void;
  setAnswer: (questionId: number, answerIndex: number) => void;
  setQuizActive: (active: boolean) => void;
  setTimeForQuestion: (questionId: number, time: number) => void;
  resetQuiz: () => void;
}

const INITIAL_STATE = {
  currentQuestion: 0,
  score: 0,
  timeRemaining: 30,
  questions: [],
  answers: {},
  isQuizActive: false,
  timePerQuestion: {},
};

export const useQuizStore = create<QuizState>((set) => ({
  ...INITIAL_STATE,
  setCurrentQuestion: (questionIndex) => set({ currentQuestion: questionIndex }),
  setScore: (score) => set({ score }),
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  setQuestions: (questions) => set({ questions }),
  setAnswer: (questionId, answerIndex) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answerIndex },
    })),
  setQuizActive: (active) => set({ isQuizActive: active }),
  setTimeForQuestion: (questionId, time) =>
    set((state) => ({
      timePerQuestion: { ...state.timePerQuestion, [questionId]: time },
    })),
  resetQuiz: () => set({
    ...INITIAL_STATE,
    questions: [], // Reset questions too to force a clean state
  }),
}));