export type UserLevel = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'ROYAL VIP';

export interface ClubUser {
  id: string;
  name: string;
  phone: string;
  cardNumber: string;
  cardType: string;
  level: UserLevel;
  discountBarKitchen: number; // e.g. 0%
  cashlessFeeRate: number; // e.g. 20%
  averageCheck: number; // in RUB
  maxSpendVisit: number; // in RUB
  visitsCount: number;
  cashbackPercent: number; // e.g. 0.0%
  pleasureCurrencyBalance: number; // ВУ (Валюта Удовольствия)
  dailySpendLimitVU: number;
  dailySpentVU: number;
  artifactsVisitsCount: number;
  artifactsSpendCount: number;
  artifactsList: Artifact[];
  activeCouponsCount: number;
}

export interface LevelInfo {
  level: UserLevel;
  title: string;
  minSpend: number;
  cashback: number;
  barDiscount: number;
  cashlessMarkup: number;
  perks: string[];
}

export interface Artifact {
  id: string;
  title: string;
  category: 'visit' | 'spend';
  rarity: 'rare' | 'epic' | 'legendary';
  description: string;
  unlockedAt?: string;
  iconName: string;
}

export interface ClubVenue {
  id: string;
  name: string;
  address: string;
  metro: string;
  hours: string;
  phone: string;
  rating: number;
  photos?: string[];
  features: string[];
  dressCode: string;
  activeShowTonight: string;
}

export interface TableZone {
  id: string;
  name: string;
  tag: string;
  capacity: string;
  depositPerPerson: number;
  description: string;
  viewAngle: string;
  recommendedFor: string;
}

export interface NightQuest {
  id: string;
  title: string;
  description: string;
  rewardVU: number;
  rewardArtifact?: string;
  progress: number;
  target: number;
  deadlineLabel: string;
  urgentTonight?: boolean;
  actionText: string;
}

export interface WheelPrize {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  type: 'drink' | 'private' | 'vu' | 'hookah' | 'upgrade' | 'champagne';
}

export interface PleasurePrivilege {
  id: string;
  title: string;
  category: 'dance' | 'bar' | 'vip' | 'experience';
  costVU: number;
  originalRubCost: number;
  description: string;
  badge?: string;
}

export interface DancerPerformer {
  id: string;
  stageName: string;
  clubId: string;
  style: string;
  soloShowTime: string;
  signatureMusic: string;
  about: string;
  isTonightPerformer: boolean;
  avatarBg: string;
}
