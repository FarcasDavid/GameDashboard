import React, { useState, useEffect, useCallback } from 'react';
import { GameLayout } from '../../components/GameLayout';
import { GameStatus } from '../../components/games/word-scramble/GameStatus';
import { LetterStack } from '../../components/games/word-scramble/LetterStack';
import { Feedback } from '../../components/games/word-scramble/Feedback';
import { getRandomWord, scrambleWord } from '../../utils/wordUtils';
import type { WordScrambleState } from '../../types/wordScramble';

const INITIAL_STATE: WordScrambleState = {
  currentWord: '',
  scrambledWord: '',
  selectedLetters: [],
  score: 0,
  timeLeft: 30,
  round: 1,
  totalRounds: 3,
  gameOver: false,
  showHint: false,
  correct: 0,
  incorrect: 0,
  feedback: { type: null, message: '' },
  isShaking: false,
};

export function WordScrambleGame() {
  const [gameState, setGameState] = useState<WordScrambleState>(INITIAL_STATE);

  const startNewRound = useCallback(() => {
    const newWord = getRandomWord();
    setGameState(prev => ({
      ...prev,
      currentWord: newWord,
      scrambledWord: scrambleWord(newWord),
      selectedLetters: [],
      timeLeft: 30,
      showHint: false,
      feedback: { type: null, message: '' },
      isShaking: false,
    }));
  }, []);

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  useEffect(() => {
    if (gameState.gameOver) return;

    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 1) {
          const newRound = prev.round + 1;
          if (newRound > prev.totalRounds) {
            return { ...prev, timeLeft: 0, gameOver: true };
          }
          const newWord = getRandomWord();
          return {
            ...prev,
            currentWord: newWord,
            scrambledWord: scrambleWord(newWord),
            selectedLetters: [],
            timeLeft: 30,
            round: newRound,
            showHint: false,
            incorrect: prev.incorrect + 1,
            feedback: { type: null, message: '' },
          };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.gameOver]);

  const handleLetterClick = (letter: string, index: number) => {
    setGameState(prev => {
      // If clicking a letter in the solution, remove it
      if (index !== -1) {
        const newSelected = [...prev.selectedLetters];
        newSelected[index] = '';
        return {
          ...prev,
          selectedLetters: newSelected.filter(l => l !== ''),
          feedback: { type: null, message: '' },
        };
      }

      // Add letter to solution
      const newSelected = [...prev.selectedLetters, letter];
      
      // Check if word is complete
      if (newSelected.length === prev.currentWord.length) {
        const attempt = newSelected.join('');
        if (attempt === prev.currentWord) {
          const points = Math.ceil(prev.timeLeft * 10);
          const newRound = prev.round + 1;
          
          // Show success feedback
          setTimeout(() => {
            if (newRound > prev.totalRounds) {
              setGameState(prev => ({
                ...prev,
                score: prev.score + points,
                gameOver: true,
                correct: prev.correct + 1,
              }));
            } else {
              const newWord = getRandomWord();
              setGameState(prev => ({
                ...prev,
                currentWord: newWord,
                scrambledWord: scrambleWord(newWord),
                selectedLetters: [],
                score: prev.score + points,
                timeLeft: 30,
                round: newRound,
                showHint: false,
                correct: prev.correct + 1,
                feedback: { type: null, message: '' },
              }));
            }
          }, 1000);

          return {
            ...prev,
            selectedLetters: newSelected,
            feedback: { type: 'success', message: 'Correct!' },
          };
        } else {
          // Wrong answer - shake and show error
          return {
            ...prev,
            selectedLetters: newSelected,
            feedback: { type: 'error', message: 'Wrong! Try again' },
            isShaking: true,
          };
        }
      }

      return {
        ...prev,
        selectedLetters: newSelected,
        feedback: { type: null, message: '' },
      };
    });

    // Reset shaking animation after a short delay
    if (gameState.isShaking) {
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          isShaking: false,
        }));
      }, 500);
    }
  };

  const handleHint = () => {
    setGameState(prev => {
      const currentLetters = prev.selectedLetters;
      const targetWord = prev.currentWord;
      
      // Find the next correct letter position
      let nextPosition = currentLetters.length;
      const nextLetter = targetWord[nextPosition];

      return {
        ...prev,
        selectedLetters: [...currentLetters, nextLetter],
        showHint: true,
        score: Math.max(0, prev.score - 50),
      };
    });
  };

  const handleRestart = () => {
    const newWord = getRandomWord();
    setGameState({
      ...INITIAL_STATE,
      currentWord: newWord,
      scrambledWord: scrambleWord(newWord),
    });
  };

  return (
    <GameLayout>
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Word Scramble</h1>
        
        <GameStatus
          score={gameState.score}
          timeLeft={gameState.timeLeft}
          round={gameState.round}
          totalRounds={gameState.totalRounds}
          correct={gameState.correct}
          incorrect={gameState.incorrect}
        />

        {!gameState.gameOver ? (
          <div className="bg-white rounded-lg p-8 shadow-md">
            <Feedback
              message={gameState.feedback.message}
              type={gameState.feedback.type}
            />

            <LetterStack
              letters={gameState.scrambledWord.split('')}
              selectedLetters={gameState.selectedLetters}
              onLetterClick={handleLetterClick}
              isShaking={gameState.isShaking}
            />

            <div className="mt-8">
              <button
                onClick={handleHint}
                disabled={gameState.showHint || gameState.selectedLetters.length === gameState.currentWord.length}
                className={`
                  px-6 py-2 rounded-lg text-white transition-colors
                  ${(gameState.showHint || gameState.selectedLetters.length === gameState.currentWord.length)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'}
                `}
              >
                Get Hint (-50 points)
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="text-xl mb-4">Final Score: {gameState.score}</p>
            <div className="flex justify-center gap-4 text-lg mb-6">
              <span className="text-green-600">Correct: {gameState.correct}</span>
              <span className="text-red-600">Incorrect: {gameState.incorrect}</span>
            </div>
            <button
              onClick={handleRestart}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </GameLayout>
  );
}