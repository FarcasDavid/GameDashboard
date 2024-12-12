import { Game } from '../types/game';

export const games: Game[] = [
  {
    id: 'card-memory',
    title: 'Card Memorization',
    description: 'Match pairs of cards before time runs out',
    icon: '🎴',
    path: '/games/card-memory',
    difficulty: 'easy'
  },
  {
    id: 'word-scramble',
    title: 'Word Scramble',
    description: 'Unscramble words against the clock',
    icon: '📝',
    path: '/games/word-scramble',
    difficulty: 'medium'
  },
  {
    id: 'color-memory',
    title: 'Color Memory',
    description: 'Remember and repeat color sequences',
    icon: '🎨',
    path: '/games/color-memory',
    difficulty: 'hard'
  }
];