import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../lib/useTheme';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="fixed top-2 sm:top-4 right-2 sm:right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:scale-110 transition-transform duration-200 z-50"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-300" />
      ) : (
        <Moon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600" />
      )}
    </button>
  );
};