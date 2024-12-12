import React from 'react';
import { GameCard } from '../components/GameCard';
import { games } from '../data/games';
import { Gamepad2 } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Brain Training Games</h1>
          </div>
          <p className="text-gray-600">Challenge yourself with these exciting mini-games!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
}