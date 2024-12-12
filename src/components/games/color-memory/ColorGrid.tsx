import React from 'react';
import { ColorButton } from './ColorButton';
import { COLORS } from '../../../types/colorMemory';

interface ColorGridProps {
  highlightedColor: string | null;
  onColorClick: (color: string) => void;
}

export function ColorGrid({ highlightedColor, onColorClick }: ColorGridProps) {
  return (
    <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
      {COLORS.map((color) => (
        <ColorButton
          key={color.value}
          color={color.value}
          isHighlighted={highlightedColor === color.value}
          onClick={() => onColorClick(color.value)}
        />
      ))}
    </div>
  );
}