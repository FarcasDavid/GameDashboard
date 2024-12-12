import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Game } from '../types/game';
import { ArrowRight } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  hard: 'bg-red-100 text-red-800 border-red-200'
};

export function GameCard({ game }: GameCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(game.path)}
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl text-gray-600">{game.icon}</div>
        <span className={`
          px-3 py-1 rounded-full text-sm font-medium border
          ${difficultyColors[game.difficulty]}
          transition-all duration-300
        `}>
          {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{game.description}</p>
      <div className="absolute bottom-4 right-4">
        <ArrowRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}