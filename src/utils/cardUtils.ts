import type { Card } from '../types/card';

const EMOJIS = ['🌟', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮', '🎼'];

export function generateCards(): Card[] {
  const pairs = EMOJIS.slice(0, 8); // Using all 8 emojis for 8 pairs
  const allCards = [...pairs, ...pairs]; // Creates 16 cards (8 pairs)
  
  return shuffleArray(allCards).map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }));
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}