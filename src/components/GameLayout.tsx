import React from 'react';
import { BackButton } from './BackButton';

interface GameLayoutProps {
  children: React.ReactNode;
}

export function GameLayout({ children }: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 relative p-8">
      <BackButton />
      <div className="max-w-4xl mx-auto pt-16">
        {children}
      </div>
    </div>
  );
}