import { openDB } from 'idb';

const DB_NAME = 'quiz_db';
const DB_VERSION = 1;

export interface QuizAttempt {
  id?: number;
  timestamp: number;
  score: number;
  totalQuestions: number;
  timePerQuestion: Record<number, number>;
}

export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('attempts')) {
        db.createObjectStore('attempts', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
};

export const saveQuizAttempt = async (attempt: Omit<QuizAttempt, 'id'>) => {
  const db = await initDB();
  return db.add('attempts', attempt);
};

export const getQuizAttempts = async () => {
  const db = await initDB();
  return db.getAll('attempts');
};