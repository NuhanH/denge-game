import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, drawRandomCard } from '../data/cards';
import CardDisplay from '../components/CardDisplay';

export default function Game() {
  const navigate = useNavigate();
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDrawCard = () => {
    setIsDrawing(true);
    setCurrentCard(null);

    // Kısa animasyon gecikmesi
    setTimeout(() => {
      const newCard = drawRandomCard();
      setCurrentCard(newCard);
      setIsDrawing(false);
    }, 300);
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-white/90 hover:text-white flex items-center gap-2 transition-colors"
          >
            ← Ana Sayfa
          </button>
          <h1 className="text-2xl font-bold text-white">🎮 Denge</h1>
          <div className="w-24"></div> {/* Spacer */}
        </div>
      </header>

      {/* Ana Oyun Alanı */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full space-y-8">
          {/* Kart Gösterim Alanı */}
          <div className="min-h-[400px] flex items-center justify-center">
            {currentCard ? (
              <CardDisplay card={currentCard} />
            ) : (
              <div className="text-center text-white/80">
                <div className="text-6xl mb-4">🎴</div>
                <p className="text-xl">Bir kart çekmek için butona tıkla</p>
              </div>
            )}
          </div>

          {/* Kart Çekme Butonu */}
          <div className="text-center">
            <button
              onClick={handleDrawCard}
              disabled={isDrawing}
              className={`
                bg-white text-purple-600 font-bold text-xl py-6 px-12 rounded-full 
                shadow-2xl transform transition-all duration-300
                ${isDrawing 
                  ? 'opacity-50 cursor-not-allowed scale-95' 
                  : 'hover:scale-105 hover:shadow-3xl pulse-animation'
                }
              `}
            >
              {isDrawing ? '⏳ Çekiliyor...' : '🎲 Kart Çek'}
            </button>
          </div>

          {/* Bilgi */}
          {currentCard && (
            <div className="text-center text-white/70 text-sm fade-in">
              <p>Bir sonraki kart için tekrar çekin</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
