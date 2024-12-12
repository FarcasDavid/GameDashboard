import React, { useState, useEffect, useCallback } from 'react';
import { GameLayout } from '../../components/GameLayout';
import { Card } from '../../components/games/card-memory/Card';
import { GameStatus } from '../../components/games/card-memory/GameStatus';
import { GameOver } from '../../components/games/card-memory/GameOver';
import { generateCards } from '../../utils/cardUtils';
import type { Card as CardType, GameState } from '../../types/card';

const TOTAL_PAIRS = 16;
const INITIAL_STATE: GameState = {
  cards: generateCards(),
  flippedCards: [],
  matchedPairs: 0,
  stars: 5,
  gameStarted: false,
  gameOver: false,
  isWinner: false,
  timeLeft: 60,
};

export function CardMemoryGame() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [isRevealing, setIsRevealing] = useState(true);

  const startGame = useCallback(() => {
    setIsRevealing(true);
    setGameState(prev => ({
      ...prev,
      cards: prev.cards.map(card => ({ ...card, isFlipped: true })),
      gameStarted: false,
    }));

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        cards: prev.cards.map(card => ({ ...card, isFlipped: false })),
        gameStarted: true,
      }));
      setIsRevealing(false);
    }, 3000);
  }, []);

  useEffect(() => {
    startGame();
    const gameInterval = setInterval(() => {
      setGameState(prev => {
        if (!prev.gameStarted || prev.gameOver) return prev;

        const newTimeLeft = prev.timeLeft - 1;
        const shouldDropStar = prev.timeLeft % 12 === 0 && prev.timeLeft !== 60;
        const newStars = shouldDropStar && prev.stars > 1 ? prev.stars - 1 : prev.stars;

        if (newTimeLeft <= 0) {
          clearInterval(gameInterval);
          return {
            ...prev,
            timeLeft: 0,
            gameOver: true,
            isWinner: false,
          };
        }

        return {
          ...prev,
          timeLeft: newTimeLeft,
          stars: newStars,
        };
      });
    }, 1000);

    return () => clearInterval(gameInterval);
  }, [startGame]);

  const handleCardClick = (cardId: number) => {
    if (gameState.flippedCards.length === 2 || !gameState.gameStarted) return;

    setGameState(prev => {
      const newCards = prev.cards.map(card =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      );
      const newFlippedCards = [...prev.flippedCards, cardId];

      if (newFlippedCards.length === 2) {
        const [firstId, secondId] = newFlippedCards;
        const firstCard = newCards.find(card => card.id === firstId);
        const secondCard = newCards.find(card => card.id === secondId);

        if (firstCard?.value === secondCard?.value) {
          setTimeout(() => {
            setGameState(prev => {
              const updatedCards = prev.cards.map(card =>
                card.id === firstId || card.id === secondId
                  ? { ...card, isMatched: true, isFlipped: true }
                  : card
              );
              const newMatchedPairs = prev.matchedPairs + 1;
              const isWinner = newMatchedPairs === TOTAL_PAIRS;

              return {
                ...prev,
                cards: updatedCards,
                matchedPairs: newMatchedPairs,
                flippedCards: [],
                gameOver: isWinner,
                isWinner,
              };
            });
          }, 500);
        } else {
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              cards: prev.cards.map(card =>
                card.id === firstId || card.id === secondId
                  ? { ...card, isFlipped: false }
                  : card
              ),
              flippedCards: [],
            }));
          }, 1000);
        }
      }

      return {
        ...prev,
        cards: newCards,
        flippedCards: newFlippedCards,
      };
    });
  };

  const handleRestart = () => {
    setGameState({
      ...INITIAL_STATE,
      cards: generateCards(),
    });
    startGame();
  };

  return (
    <GameLayout>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Card Memory Game</h1>
        <GameStatus
          stars={gameState.stars}
          matchedPairs={gameState.matchedPairs}
          totalPairs={TOTAL_PAIRS}
          timeLeft={gameState.timeLeft}
        />
        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
          {gameState.cards.map(card => (
            <Card
              key={card.id}
              card={card}
              onClick={handleCardClick}
              disabled={isRevealing || gameState.flippedCards.length === 2}
            />
          ))}
        </div>
        {gameState.gameOver && (
          <GameOver
            isWinner={gameState.isWinner}
            stars={gameState.stars}
            onRestart={handleRestart}
          />
        )}
      </div>
    </GameLayout>
  );
}