import React from 'react';
import type { Card as CardType } from '../../../types/card';

interface CardProps {
  card: CardType;
  onClick: (id: number) => void;
  disabled: boolean;
}

export function Card({ card, onClick, disabled }: CardProps) {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-24 h-24 cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      <div
        className={`
          absolute w-full h-full transition-transform duration-500 transform-style-preserve-3d
          ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}
        `}
      >
        <div className="absolute w-full h-full rounded-lg flex items-center justify-center text-4xl bg-indigo-600 text-white backface-hidden">
          ?
        </div>
        <div 
          className={`
            absolute w-full h-full rounded-lg flex items-center justify-center text-4xl
            ${card.isMatched ? 'bg-green-500' : 'bg-white'} shadow-lg
            transform rotate-y-180 backface-hidden
          `}
        >
          {card.value}
        </div>
      </div>
    </div>
  );
}