import React from 'react';
import { Timer } from './Timer';

interface GameStatusProps {
  stars: number;
  matchedPairs: number;
  totalPairs: number;
  timeLeft: number;
}

export function GameStatus({ stars, matchedPairs, totalPairs, timeLeft }: GameStatusProps) {
  return (
    <div className="flex items-center justify-between mb-8 bg-white rounded-lg p-4 shadow-md">
      <div className="text-xl space-x-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className="text-2xl inline-block">
            {index < stars ? '⭐' : '☆'}
          </span>
        ))}
      </div>
      <Timer timeLeft={timeLeft} />
      <div className="text-lg font-semibold text-gray-700">
        Matches: {matchedPairs}/{totalPairs}
      </div>
    </div>
  );
}