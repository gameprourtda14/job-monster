export enum ItemType {
  SECTOR = 'SECTOR', // New type for parent businesses (Licenses)
  BUSINESS = 'BUSINESS',
  CAR = 'CAR',
  HOUSE = 'HOUSE',
  ISLAND = 'ISLAND',
  COLLECTIBLE = 'COLLECTIBLE',
  SPORT = 'SPORT' // New type
}

export interface ShopItem {
  id: string;
  name: string;
  type: ItemType;
  baseCost: number;
  incomePerSecond: number; // Passive income
  clickBonus: number; // Kept for legacy compatibility but used less
  description: string;
  owned: number;
  image?: string;
  isUnique?: boolean; // Can only own 1
  parentId?: string; // ID of the Sector required to buy this item
}

export interface Mission {
  level: number;
  description: string;
  reward: number;
  isClaimed: boolean;
  type: 'MONEY' | 'OWNED_TOTAL' | 'CLICK_POWER';
  target: number;
}

export interface GameSettings {
  soundEnabled: boolean;
  graphicsHigh: boolean;
}

export interface GameState {
  username: string;
  money: number;
  totalEarnings: number;
  level: number;
  startTime: number;
  inventory: Record<string, number>;
  items: ShopItem[];
  missions: Mission[];
  settings: GameSettings;
}

export interface ClickEffect {
  id: number;
  x: number;
  y: number;
  value: number;
}