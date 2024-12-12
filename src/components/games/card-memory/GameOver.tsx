import React from 'react';

interface GameOverProps {
  isWinner: boolean;
  stars: number;
  onRestart: () => void;
}

export function GameOver({ isWinner, stars, onRestart }: GameOverProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
        <h2 className="text-3xl font-bold mb-4">
          {isWinner ? 'Congratulations! 🎉' : 'Game Over'}
        </h2>
        <p className="text-xl mb-4">
          {isWinner 
            ? `You won with ${stars} stars!` 
            : 'Better luck next time!'}
        </p>
        <div className="mb-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className="text-3xl">
              {index < stars ? '⭐' : '☆'}
            </span>
          ))}
        </div>
        <button
          onClick={onRestart}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}