// Kart tipleri
export type CardType = 'shape' | 'action';

export interface Card {
  id: number;
  type: CardType;
  name: string;
  description?: string;
  icon?: string;
  shape?: number[][]; // Şekil kartları için 2D grid (1 = dolu, 0 = boş)
  image?: string; // Şekil kartları için fotoğraf yolu
  count?: number; // Her karttan kaç tane var
}

export interface CardDeck {
  cards: Card[];
  remaining: number;
}

// 9 farklı şekil kartı
// Her karttan 3'er tane
const shapeCards: Card[] = [
  {
    id: 1,
    type: 'shape',
    name: 'Grass',
    image: '/grass.png',
    icon: '🌱',
    count: 3,
  },
  {
    id: 2,
    type: 'shape',
    name: 'Rainbow',
    image: '/rainbow.png',
    icon: '🌈',
    count: 3,
  },
  {
    id: 3,
    type: 'shape',
    name: 'Rock',
    image: '/rock.png',
    icon: '🪨',
    count: 3,
  },
  {
    id: 4,
    type: 'shape',
    name: 'Seed',
    image: '/seed.png',
    icon: '🌾',
    count: 3,
  },
  {
    id: 5,
    type: 'shape',
    name: 'Soil',
    image: '/soil.png',
    icon: '�',
    count: 3,
  },
  {
    id: 6,
    type: 'shape',
    name: 'Sun',
    image: '/sun.png',
    icon: '☀️',
    count: 3,
  },
  {
    id: 7,
    type: 'shape',
    name: 'Tree',
    image: '/tree.png',
    icon: '🌳',
    count: 3,
  },
  {
    id: 8,
    type: 'shape',
    name: 'Wave',
    image: '/wave.png',
    icon: '🌊',
    count: 3,
  },
  {
    id: 9,
    type: 'shape',
    name: 'Wind',
    image: '/wind.png',
    icon: '�',
    count: 3,
  },
];

// Hareket kartları (her birinden 2'şer tane)
const actionCards: Card[] = [
  {
    id: 101,
    type: 'action',
    name: 'Ayağa Kalk',
    description: 'Ayağa kalk ve platformunu tut!',
    icon: '🧍',
    count: 2,
  },
  {
    id: 102,
    type: 'action',
    name: 'Tek Ayak',
    description: 'Tek ayak üstünde dur!',
    icon: '🦵',
    count: 2,
  },
  {
    id: 103,
    type: 'action',
    name: 'El Değiştir',
    description: 'Platformunu diğer eline geçir!',
    icon: '🤝',
    count: 2,
  },
  {
    id: 104,
    type: 'action',
    name: 'Gözleri Kapat',
    description: '5 saniye gözlerini kapat!',
    icon: '🙈',
    count: 2,
  },
  {
    id: 105,
    type: 'action',
    name: 'Döndür',
    description: 'Platformunu 180° döndür!',
    icon: '🔄',
    count: 2,
  },
  {
    id: 106,
    type: 'action',
    name: 'Zıpla',
    description: 'Yerinde 3 kere zıpla!',
    icon: '⬆️',
    count: 2,
  },
  {
    id: 107,
    type: 'action',
    name: 'Sessizlik',
    description: 'Bir sonraki tura kadar konuşma!',
    icon: '🤫',
    count: 2,
  },
  {
    id: 108,
    type: 'action',
    name: 'Dans Et',
    description: '5 saniye dans et!',
    icon: '💃',
    count: 2,
  },
];

// Deste oluşturma - her karttan belirtilen sayıda ekle
function createDeck(): Card[] {
  const deck: Card[] = [];
  [...shapeCards, ...actionCards].forEach((card) => {
    const count = card.count || 1;
    for (let i = 0; i < count; i++) {
      deck.push({ ...card });
    }
  });
  return deck;
}

// Desteyi karıştırma
function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Yeni deste oluştur
export function initializeDeck(): CardDeck {
  const cards = shuffleDeck(createDeck());
  return {
    cards,
    remaining: cards.length,
  };
}

// Desteden kart çek
export function drawCard(deck: CardDeck): { card: Card | null; newDeck: CardDeck } {
  if (deck.remaining === 0) {
    return { card: null, newDeck: deck };
  }

  const card = deck.cards[deck.cards.length - deck.remaining];
  return {
    card,
    newDeck: {
      cards: deck.cards,
      remaining: deck.remaining - 1,
    },
  };
}
