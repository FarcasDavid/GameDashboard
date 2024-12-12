export interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: number[];
  matchedPairs: number;
  stars: number;
  gameStarted: boolean;
  gameOver: boolean;
  isWinner: boolean;
  timeLeft: number;
}