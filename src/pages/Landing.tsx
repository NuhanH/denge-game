import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center fade-in">
        {/* Logo/Başlık */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4">
            🎮 Denge
          </h1>
          <p className="text-xl text-white/90">
            Platform Denge Oyunu
          </p>
        </div>

        {/* Açıklama Kartı */}
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Nasıl Oynanır?
          </h2>
          <div className="text-left space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-2xl">1️⃣</span>
              <p>Her oyuncu elinde bir platform tutar</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">2️⃣</span>
              <p>Sırayla kart çekin - şekil veya hareket kartı gelir</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">3️⃣</span>
              <p><strong>Şekil kartı:</strong> Bloğu platformunuza yerleştirin</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">4️⃣</span>
              <p><strong>Hareket kartı:</strong> Kartın gösterdiği hareketi yapın</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏆</span>
              <p>Platformunu dengelemeye devam eden kazanır!</p>
            </div>
          </div>
        </div>

        {/* Oyuna Başla Butonu */}
        <button
          onClick={() => navigate('/game')}
          className="pulse-animation bg-white text-purple-600 font-bold text-2xl py-6 px-12 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
        >
          🎯 Oyuna Başla
        </button>

        {/* Alt Bilgi */}
        <p className="mt-8 text-white/70 text-sm">
          Kartları çekmek için butona tıklayın
        </p>
      </div>
    </div>
  );
}
