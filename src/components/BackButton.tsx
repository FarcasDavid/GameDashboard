import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back to Dashboard</span>
    </button>
  );
}