import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { CardMemoryGame } from './pages/games/CardMemoryGame';
import { WordScrambleGame } from './pages/games/WordScrambleGame';
import { ColorMemoryGame } from './pages/games/ColorMemoryGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/games/card-memory" element={<CardMemoryGame />} />
        <Route path="/games/word-scramble" element={<WordScrambleGame />} />
        <Route path="/games/color-memory" element={<ColorMemoryGame />} />
      </Routes>
    </Router>
  );
}

export default App;