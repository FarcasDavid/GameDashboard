export interface WordScrambleState {
  currentWord: string;
  scrambledWord: string;
  selectedLetters: string[];
  score: number;
  timeLeft: number;
  round: number;
  totalRounds: number;
  gameOver: boolean;
  showHint: boolean;
  correct: number;
  incorrect: number;
  feedback: {
    type: 'success' | 'error' | null;
    message: string;
  };
  isShaking: boolean;
}