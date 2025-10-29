// Kart tipleri
export type CardType = 'shape' | 'action';

export interface Card {
  id: number;
  type: CardType;
  name: string;
  description?: string;
  icon?: string;
  shape?: number[][]; // Şekil kartları için 2D grid (1 = dolu, 0 = boş)
}

// 9 farklı şekil kartı (Tetris benzeri bloklar)
const shapeCards: Card[] = [
  {
    id: 1,
    type: 'shape',
    name: 'I Bloğu',
    shape: [[1, 1, 1, 1]],
    icon: '🟦',
  },
  {
    id: 2,
    type: 'shape',
    name: 'O Bloğu',
    shape: [
      [1, 1],
      [1, 1],
    ],
    icon: '🟨',
  },
  {
    id: 3,
    type: 'shape',
    name: 'T Bloğu',
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    icon: '🟪',
  },
  {
    id: 4,
    type: 'shape',
    name: 'L Bloğu',
    shape: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    icon: '🟧',
  },
  {
    id: 5,
    type: 'shape',
    name: 'J Bloğu',
    shape: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    icon: '🟦',
  },
  {
    id: 6,
    type: 'shape',
    name: 'S Bloğu',
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    icon: '🟩',
  },
  {
    id: 7,
    type: 'shape',
    name: 'Z Bloğu',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    icon: '🟥',
  },
  {
    id: 8,
    type: 'shape',
    name: 'Küçük L',
    shape: [
      [1, 0],
      [1, 1],
    ],
    icon: '🟫',
  },
  {
    id: 9,
    type: 'shape',
    name: 'Plus Bloğu',
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    icon: '🟪',
  },
];

// Hareket kartları (sayıyı istediğin kadar ayarlayabiliriz)
const actionCards: Card[] = [
  {
    id: 101,
    type: 'action',
    name: 'Ayağa Kalk',
    description: 'Ayağa kalk ve platformunu tut!',
    icon: '🧍',
  },
  {
    id: 102,
    type: 'action',
    name: 'Tek Ayak',
    description: 'Tek ayak üstünde dur!',
    icon: '🦵',
  },
  {
    id: 103,
    type: 'action',
    name: 'El Değiştir',
    description: 'Platformunu diğer eline geçir!',
    icon: '🤝',
  },
  {
    id: 104,
    type: 'action',
    name: 'Gözleri Kapat',
    description: '5 saniye gözlerini kapat!',
    icon: '🙈',
  },
  {
    id: 105,
    type: 'action',
    name: 'Döndür',
    description: 'Platformunu 180° döndür!',
    icon: '🔄',
  },
  {
    id: 106,
    type: 'action',
    name: 'Zıpla',
    description: 'Yerinde 3 kere zıpla!',
    icon: '⬆️',
  },
  {
    id: 107,
    type: 'action',
    name: 'Sessizlik',
    description: 'Bir sonraki tura kadar konuşma!',
    icon: '🤫',
  },
  {
    id: 108,
    type: 'action',
    name: 'Dans Et',
    description: '5 saniye dans et!',
    icon: '💃',
  },
];

// Tüm kartlar
export const allCards: Card[] = [...shapeCards, ...actionCards];

// Rastgele kart çekme fonksiyonu
export function drawRandomCard(): Card {
  const randomIndex = Math.floor(Math.random() * allCards.length);
  return allCards[randomIndex];
}
