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
    count: 4,
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
    count: 4,
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
    count: 2,
  },
  {
    id: 7,
    type: 'shape',
    name: 'Tree',
    image: '/tree.png',
    icon: '🌳',
    count: 4,
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

// Action cards
const actionCards: Card[] = [
  {
    id: 101,
    type: 'action',
    name: 'Switch Hands',
    description: 'Switch your platform to the other hand (right → left or left → right)',
    icon: '�',
    count: 2,
  },
  {
    id: 102,
    type: 'action',
    name: 'Reach Forward',
    description: 'Extend your hand forward while holding the platform',
    icon: '👉',
    count: 1,
  },
  {
    id: 103,
    type: 'action',
    name: 'Stand on One Leg',
    description: 'Stand on one leg for 10 seconds',
    icon: '�',
    count: 2,
  },
  {
    id: 104,
    type: 'action',
    name: 'Circle Around Players',
    description: 'Walk around all the players once',
    icon: '�',
    count: 1,
  },
  {
    id: 105,
    type: 'action',
    name: 'Spin Around',
    description: 'Spin around yourself once',
    icon: '🌀',
    count: 3,
  },
  {
    id: 106,
    type: 'action',
    name: 'Stand Up / Sit Down',
    description: 'Stand up (if sitting) or sit down (if standing)',
    icon: '🧍',
    count: 3,
  },
  {
    id: 107,
    type: 'action',
    name: 'Skip Next Turn',
    description: "Don't place any block on your next turn",
    icon: '⏭️',
    count: 1,
  },
  {
    id: 108,
    type: 'action',
    name: 'Steal a Block',
    description: "Take the top block from another player's platform and place it on yours",
    icon: '🎯',
    count: 1,
  },
  {
    id: 109,
    type: 'action',
    name: 'Double Block',
    description: 'Place 2 blocks on your next turn',
    icon: '➕',
    count: 1,
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
