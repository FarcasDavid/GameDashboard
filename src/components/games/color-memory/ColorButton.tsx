import React from 'react';
import { motion } from 'framer-motion';

interface ColorButtonProps {
  color: string;
  isHighlighted: boolean;
  onClick?: () => void;
}

export function ColorButton({ color, isHighlighted, onClick }: ColorButtonProps) {
  return (
    <motion.button
      className="w-20 h-20 rounded-lg shadow-lg"
      style={{ backgroundColor: color }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      animate={{
        scale: isHighlighted ? [1, 1.2, 1] : 1,
        boxShadow: isHighlighted 
          ? ['0 4px 6px rgba(0,0,0,0.1)', '0 0 30px rgba(255,255,255,0.8)', '0 4px 6px rgba(0,0,0,0.1)']
          : '0 4px 6px rgba(0,0,0,0.1)',
        transition: {
          duration: isHighlighted ? 0.5 : 0.2,
          ease: "easeInOut"
        }
      }}
      onClick={onClick}
    />
  );
}