export interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GameScore {
  score: number;
  stars?: number;
  timeElapsed?: number;
  correct?: number;
  incorrect?: number;
}