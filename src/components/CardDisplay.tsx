import React, { useState, useEffect } from 'react';
import { Card } from '../data/cards';

interface CardDisplayProps {
  card: Card;
}

export default function CardDisplay({ card }: CardDisplayProps) {
  const showTimer = card.name === 'Stand on One Leg';

  return (
    <div className="card-flip">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        {/* Kart Başlığı */}
        <div className="text-center mb-6">
          {card.type === 'action' && <div className="text-6xl mb-3">{card.icon}</div>}
          <h2 className="text-3xl font-bold text-gray-800">{card.name}</h2>
          <span
            className={`
              inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold
              ${card.type === 'shape' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-pink-100 text-pink-700'
              }
            `}
          >
            {card.type === 'shape' ? '🔷 Block Card' : '⚡ Action Card'}
          </span>
        </div>

        {/* Kart İçeriği */}
        {card.type === 'shape' && card.image ? (
          <ShapeDisplay image={card.image} name={card.name} />
        ) : (
          <ActionDisplay description={card.description || ''} showTimer={showTimer} />
        )}
      </div>
    </div>
  );
}

// Şekil kartı gösterimi (fotoğraf ile)
function ShapeDisplay({ image, name }: { image: string; name: string }) {
  return (
    <div className="flex justify-center items-center py-6">
      <img
        src={image}
        alt={name}
        className="max-w-xs w-full h-auto rounded-2xl shadow-xl"
        style={{ maxHeight: '300px', objectFit: 'contain' }}
      />
    </div>
  );
}

// Hareket kartı gösterimi
function ActionDisplay({ description, showTimer }: { description: string; showTimer: boolean }) {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!showTimer || !isRunning) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isRunning, showTimer]);

  const startTimer = () => {
    setTimeLeft(10);
    setIsRunning(true);
  };

  const resetTimer = () => {
    setTimeLeft(10);
    setIsRunning(false);
  };

  return (
    <div className="py-6">
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200">
        <p className="text-xl text-gray-800 text-center font-medium mb-4">
          {description}
        </p>
        
        {showTimer && (
          <div className="mt-6 space-y-4">
            {/* Timer Display */}
            <div className="text-center">
              <div className={`text-7xl font-bold ${timeLeft <= 3 && isRunning ? 'text-red-500 animate-pulse' : 'text-purple-600'}`}>
                {timeLeft}
              </div>
              <p className="text-sm text-gray-600 mt-2">seconds</p>
            </div>
            
            {/* Timer Controls */}
            <div className="flex gap-3 justify-center">
              {!isRunning || timeLeft === 0 ? (
                <button
                  onClick={startTimer}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition-colors shadow-lg"
                >
                  ▶️ Start
                </button>
              ) : null}
              
              {isRunning && timeLeft > 0 && (
                <button
                  onClick={resetTimer}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-full transition-colors shadow-lg"
                >
                  🔄 Reset
                </button>
              )}
            </div>
            
            {timeLeft === 0 && (
              <div className="text-center text-green-600 font-bold text-xl animate-pulse">
                ✅ Done!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
