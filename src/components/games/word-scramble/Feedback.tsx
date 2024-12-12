import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeedbackProps {
  message: string;
  type: 'success' | 'error' | null;
}

export function Feedback({ message, type }: FeedbackProps) {
  const colors = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <AnimatePresence>
      {type && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`text-center py-2 px-4 rounded-lg mb-4 ${colors[type]}`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}