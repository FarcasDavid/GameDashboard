export interface ColorSequence {
  color: string;
  id: number;
}

export interface ColorMemoryState {
  currentSequence: ColorSequence[];
  playerSequence: ColorSequence[];
  gamePhase: 'showing' | 'playing' | 'feedback' | 'gameOver';
  score: number;
  bestScore: number;
}

export const COLORS = [
  { value: '#FF0000', name: 'Red' },       // Bright Red
  { value: '#00FF00', name: 'Green' },     // Bright Green
  { value: '#0000FF', name: 'Blue' },      // Bright Blue
  { value: '#FFFF00', name: 'Yellow' },    // Bright Yellow
  { value: '#FF00FF', name: 'Magenta' },   // Bright Magenta
  { value: '#00FFFF', name: 'Cyan' },      // Bright Cyan
  { value: '#FF8C00', name: 'Orange' },    // Dark Orange
  { value: '#800080', name: 'Purple' },    // Purple
  { value: '#008000', name: 'Dark Green' } // Dark Green
] as const;