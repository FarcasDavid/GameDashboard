import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LetterStackProps {
  letters: string[];
  selectedLetters: string[];
  onLetterClick: (letter: string, index: number) => void;
  isShaking: boolean;
}

export function LetterStack({ letters, selectedLetters, onLetterClick, isShaking }: LetterStackProps) {
  // Keep track of how many times each letter has been used
  const letterUsageCount = selectedLetters.reduce((acc, letter) => {
    acc[letter] = (acc[letter] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Count total occurrences of each letter in the original word
  const letterTotalCount = letters.reduce((acc, letter) => {
    acc[letter] = (acc[letter] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex flex-col gap-6">
      {/* Selected Letters */}
      <div className="flex justify-center gap-2">
        <AnimatePresence>
          {Array.from({ length: letters.length }).map((_, index) => (
            <motion.div
              key={`slot-${index}`}
              className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {selectedLetters[index] && (
                <motion.div
                  className="text-2xl font-bold text-indigo-600 cursor-pointer"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  onClick={() => onLetterClick(selectedLetters[index], index)}
                >
                  {selectedLetters[index]}
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Available Letters */}
      <motion.div 
        className="flex justify-center gap-2"
        animate={isShaking ? {
          x: [-10, 10, -10, 10, -5, 5, -2, 2, 0],
        } : {}}
        transition={{ duration: 0.5 }}
      >
        {letters.map((letter, index) => {
          // Show the letter if it hasn't been used up to its total count
          const isAvailable = (letterUsageCount[letter] || 0) < (letterTotalCount[letter] || 0);
          
          return isAvailable && (
            <motion.div
              key={`letter-${index}`}
              className="w-12 h-12 bg-white border-2 border-indigo-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-indigo-50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onLetterClick(letter, -1)}
            >
              <span className="text-2xl font-bold text-indigo-600">{letter}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}