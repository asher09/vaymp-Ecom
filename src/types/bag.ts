export interface BagItem {
  id: number;
  productId: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface BagState {
  items: BagItem[];
  totalItems: number;
  totalPrice: number;
  loading: boolean;
}
