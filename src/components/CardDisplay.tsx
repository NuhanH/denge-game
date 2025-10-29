import React from 'react';
import { Card } from '../data/cards';

interface CardDisplayProps {
  card: Card;
}

export default function CardDisplay({ card }: CardDisplayProps) {
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
          <ActionDisplay description={card.description || ''} />
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
function ActionDisplay({ description }: { description: string }) {
  return (
    <div className="py-6">
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200">
        <p className="text-xl text-gray-800 text-center font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}
