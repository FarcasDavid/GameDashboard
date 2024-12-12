import React from 'react';
import { Timer } from '../../Timer';

interface GameStatusProps {
  score: number;
  timeLeft: number;
  round: number;
  totalRounds: number;
  correct: number;
  incorrect: number;
}

export function GameStatus({ score, timeLeft, round, totalRounds, correct, incorrect }: GameStatusProps) {
  return (
    <div className="flex items-center justify-between mb-8 bg-white rounded-lg p-4 shadow-md">
      <div className="text-lg font-semibold text-gray-700">
        Round: {round}/{totalRounds}
      </div>
      <Timer timeLeft={timeLeft} />
      <div className="flex gap-4">
        <span className="text-green-600">✓ {correct}</span>
        <span className="text-red-600">✗ {incorrect}</span>
      </div>
      <div className="text-lg font-semibold text-indigo-600">
        Score: {score}
      </div>
    </div>
  );
}