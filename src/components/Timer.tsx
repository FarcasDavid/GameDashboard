import React from 'react';

interface TimerProps {
  timeLeft: number;
}

export function Timer({ timeLeft }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-lg font-semibold text-gray-700">
      Time: {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}