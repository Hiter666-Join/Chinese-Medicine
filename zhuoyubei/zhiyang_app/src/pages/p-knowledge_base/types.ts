

export interface HerbData {
  name: string;
  pinyin: string;
  category: string;
  origin: string;
  season: string;
  suitable: string;
  image: string;
  efficacy: string;
}

export interface CategoryData {
  name: string;
  count: number;
}

export type ViewMode = 'list' | 'detail';

