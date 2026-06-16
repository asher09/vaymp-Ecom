export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface Category {
  id: string;
  name: string;
}

export type SortOption = 'price-low' | 'price-high' | 'rating' | null;
