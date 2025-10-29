import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardDeck, initializeDeck, drawCard } from '../data/cards';
import CardDisplay from '../components/CardDisplay';

export default function Game() {
  const navigate = useNavigate();
  const [deck, setDeck] = useState<CardDeck>(initializeDeck());
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const handleDrawCard = () => {
    if (deck.remaining === 0) {
      setGameFinished(true);
      return;
    }

    setIsDrawing(true);
    setCurrentCard(null);

    // Kısa animasyon gecikmesi
    setTimeout(() => {
      const { card, newDeck } = drawCard(deck);
      setCurrentCard(card);
      setDeck(newDeck);
      setIsDrawing(false);

      if (newDeck.remaining === 0) {
        setTimeout(() => setGameFinished(true), 2000);
      }
    }, 300);
  };

  const handleRestart = () => {
    setDeck(initializeDeck());
    setCurrentCard(null);
    setGameFinished(false);
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
          {/* Oyun Bitti Ekranı */}
          {gameFinished ? (
            <div className="text-center fade-in">
              <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-12">
                <div className="text-7xl mb-6">🎉</div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Kartlar Bitti!
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Tüm kartlar çekildi. Oyun sona erdi!
                </p>
                <div className="space-y-4">
                  <button
                    onClick={handleRestart}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    🔄 Yeni Oyun
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="block w-full text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Ana Sayfaya Dön
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Kalan Kart Sayısı */}
              <div className="text-center">
                <div className="inline-block bg-white/20 backdrop-blur rounded-full px-6 py-2">
                  <span className="text-white font-semibold">
                    📊 Kalan Kart: {deck.remaining}
                  </span>
                </div>
              </div>

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
                  disabled={isDrawing || deck.remaining === 0}
                  className={`
                    bg-white text-purple-600 font-bold text-xl py-6 px-12 rounded-full 
                    shadow-2xl transform transition-all duration-300
                    ${isDrawing || deck.remaining === 0
                      ? 'opacity-50 cursor-not-allowed scale-95' 
                      : 'hover:scale-105 hover:shadow-3xl pulse-animation'
                    }
                  `}
                >
                  {isDrawing ? '⏳ Çekiliyor...' : '🎲 Kart Çek'}
                </button>
              </div>

              {/* Bilgi */}
              {currentCard && deck.remaining > 0 && (
                <div className="text-center text-white/70 text-sm fade-in">
                  <p>Bir sonraki kart için tekrar çekin</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
