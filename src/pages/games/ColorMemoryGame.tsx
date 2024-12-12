import React, { useState, useEffect, useCallback } from 'react';
import { GameLayout } from '../../components/GameLayout';
import { ColorGrid } from '../../components/games/color-memory/ColorGrid';
import { extendSequence, resetMasterSequence, checkSequence } from '../../utils/colorUtils';
import type { ColorMemoryState } from '../../types/colorMemory';

const INITIAL_STATE: ColorMemoryState = {
  currentSequence: [],
  playerSequence: [],
  gamePhase: 'showing',
  score: 0,
  bestScore: 0
};

const SHOW_INTERVAL = 800;
const FEEDBACK_DURATION = 1000;

export function ColorMemoryGame() {
  const [gameState, setGameState] = useState<ColorMemoryState>(INITIAL_STATE);
  const [currentShowIndex, setCurrentShowIndex] = useState<number>(-1);

  const startNewSequence = useCallback(() => {
    const newSequence = extendSequence(gameState.currentSequence.length + 1);
    console.log('New Sequence Generated:', newSequence); // Log the new sequence
    
    setGameState(prev => ({
      ...prev,
      currentSequence: newSequence,
      playerSequence: [],
      gamePhase: 'showing'
    }));
    
    setCurrentShowIndex(-1);
  }, [gameState.currentSequence.length]);

  // Start the game
  useEffect(() => {
    resetMasterSequence(); // Reset the master sequence when starting a new game
    if (gameState.currentSequence.length === 0) {
      const initialSequence = extendSequence(1);
      setGameState(prev => ({
        ...prev,
        currentSequence: initialSequence,
        gamePhase: 'showing'
      }));
    }
  }, []);

  // Handle sequence showing phase
  useEffect(() => {
    if (gameState.gamePhase !== 'showing') return;

    const showSequence = () => {
      if (currentShowIndex >= gameState.currentSequence.length) {
        setTimeout(() => {
          setGameState(prev => ({ ...prev, gamePhase: 'playing' }));
          setCurrentShowIndex(-1);
        }, SHOW_INTERVAL / 2);
        return;
      }

      const timer = setTimeout(() => {
        setCurrentShowIndex(prev => prev + 1);
      }, SHOW_INTERVAL);

      return () => clearTimeout(timer);
    };

    if (currentShowIndex === -1) {
      const startTimer = setTimeout(() => {
        setCurrentShowIndex(0);
      }, 500);
      return () => clearTimeout(startTimer);
    }

    return showSequence();
  }, [currentShowIndex, gameState.gamePhase, gameState.currentSequence.length]);

  const handleColorClick = (color: string) => {
    if (gameState.gamePhase !== 'playing') return;

    setGameState(prev => {
      const newPlayerSequence = [...prev.playerSequence, { color, id: prev.playerSequence.length }];
      
      // Check if current click is correct
      const currentIndex = newPlayerSequence.length - 1;
      const isCurrentClickCorrect = color === prev.currentSequence[currentIndex].color;

      if (!isCurrentClickCorrect) {
        return {
          ...prev,
          playerSequence: newPlayerSequence,
          gamePhase: 'gameOver'
        };
      }

      // If we've completed the sequence
      if (newPlayerSequence.length === prev.currentSequence.length) {
        const newScore = prev.currentSequence.length;
        return {
          ...prev,
          playerSequence: newPlayerSequence,
          score: newScore,
          bestScore: Math.max(prev.bestScore, newScore),
          gamePhase: 'feedback'
        };
      }

      return {
        ...prev,
        playerSequence: newPlayerSequence
      };
    });
  };

  useEffect(() => {
    if (gameState.gamePhase === 'feedback') {
      const timer = setTimeout(() => {
        startNewSequence();
      }, FEEDBACK_DURATION);
      return () => clearTimeout(timer);
    }
  }, [gameState.gamePhase, startNewSequence]);

  const handleRestart = () => {
    resetMasterSequence();
    const initialSequence = extendSequence(1);
    setGameState({
      ...INITIAL_STATE,
      currentSequence: initialSequence,
      bestScore: gameState.bestScore
    });
    setCurrentShowIndex(-1);
  };

  return (
    <GameLayout>
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Color Memory</h1>
        
        <div className="flex justify-between items-center mb-8 bg-white rounded-lg p-4 shadow-md">
          <div className="text-lg font-semibold text-gray-700">
            Current Level: {gameState.currentSequence.length}
          </div>
          <div className="text-lg font-semibold text-indigo-600">
            Best Score: {gameState.bestScore}
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-md">
          {gameState.gamePhase === 'showing' && (
            <div className="mb-6">
              <p className="text-lg text-gray-600">
                {currentShowIndex === -1 
                  ? 'Watch carefully...' 
                  : 'Remember this sequence...'}
              </p>
            </div>
          )}

          {gameState.gamePhase === 'playing' && (
            <div className="mb-6">
              <p className="text-lg text-gray-600">
                Your turn! ({gameState.playerSequence.length + 1} of {gameState.currentSequence.length})
              </p>
            </div>
          )}

          {gameState.gamePhase === 'feedback' && (
            <div className="mb-6 text-xl font-semibold text-green-600">
              Perfect! Get ready for a longer sequence...
            </div>
          )}

          {gameState.gamePhase === 'gameOver' ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
              <p className="text-xl mb-4">You reached level {gameState.currentSequence.length}!</p>
              <p className="text-lg mb-6">Best Score: {gameState.bestScore}</p>
              <button
                onClick={handleRestart}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Play Again
              </button>
            </div>
          ) : (
            <ColorGrid
              highlightedColor={currentShowIndex >= 0 ? gameState.currentSequence[currentShowIndex]?.color : null}
              onColorClick={handleColorClick}
            />
          )}
        </div>
      </div>
    </GameLayout>
  );
}