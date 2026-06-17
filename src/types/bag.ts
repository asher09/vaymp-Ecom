export interface BagItem {
  id: number;
  productId: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  brand?: string;
  originalPrice?: number;
  discountPercentage?: number;
  isSelected?: boolean;
  description?: string;
}

export interface BagState {
  items: BagItem[];
  totalItems: number;
  totalPrice: number;
  loading: boolean;
}
