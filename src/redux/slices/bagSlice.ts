import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BagItem, BagState } from '../../types/bag';
import { Product } from '../../types/product';

const initialState: BagState = {
  items: [
    {
      id: 101,
      productId: 101,
      title: 'Chanel Brown Top',
      description: 'Product description line 1\nProduct description line 2',
      price: 350,
      originalPrice: 500,
      discountPercentage: 30,
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop',
      quantity: 1,
      isSelected: true,
    },
    {
      id: 102,
      productId: 102,
      title: 'Chanel Brown Top',
      description: 'Product description line 1\nProduct description line 2',
      price: 200,
      originalPrice: 500,
      discountPercentage: 60,
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop',
      quantity: 2,
      isSelected: true,
    },
    {
      id: 103,
      productId: 103,
      title: 'Chanel Brown Top',
      description: 'Product description line 1\nProduct description line 2',
      price: 750,
      originalPrice: 990,
      discountPercentage: 24,
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop',
      quantity: 1,
      isSelected: true,
    }
  ],
  totalItems: 4,
  totalPrice: 1500,
  loading: false,
};

// Helper function to update totals for selected items only
const updateTotals = (state: BagState) => {
  state.totalItems = state.items.reduce((sum, item) => sum + (item.isSelected ? item.quantity : 0), 0);
  state.totalPrice = state.items.reduce((sum, item) => sum + (item.isSelected ? item.price * item.quantity : 0), 0);
};

const bagSlice = createSlice({
  name: 'bag',
  initialState,
  reducers: {
    addToBag: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.productId === product.id);

      if (existingItem) {
        // If product already in bag, increase quantity
        existingItem.quantity += 1;
      } else {
        // Add new item to bag
        const newItem: BagItem = {
          id: Date.now(),
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
          brand: product.brand,
          originalPrice: product.originalPrice,
          discountPercentage: product.discountPercentage,
          isSelected: true,
          description: product.description,
        };
        state.items.push(newItem);
      }

      updateTotals(state);
    },

    removeFromBag: (state, action: PayloadAction<number>) => {
      // action.payload is productId
      state.items = state.items.filter(item => item.productId !== action.payload);
      updateTotals(state);
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      // action.payload is productId
      const item = state.items.find(item => item.productId === action.payload);
      if (item) {
        item.quantity += 1;
        updateTotals(state);
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      // action.payload is productId
      const item = state.items.find(item => item.productId === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove item if quantity becomes 0
          state.items = state.items.filter(i => i.productId !== action.payload);
        }
        updateTotals(state);
      }
    },

    toggleSelectItem: (state, action: PayloadAction<number>) => {
      // action.payload is productId
      const item = state.items.find(item => item.productId === action.payload);
      if (item) {
        item.isSelected = !item.isSelected;
        updateTotals(state);
      }
    },

    toggleSelectAllItems: (state, action: PayloadAction<boolean>) => {
      // action.payload is select all status
      state.items.forEach(item => {
        item.isSelected = action.payload;
      });
      updateTotals(state);
    },

    clearBag: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },

    // For hydration from storage
    setBagState: (state, action: PayloadAction<BagState>) => {
      return action.payload;
    },
  },
});

export const {
  addToBag,
  removeFromBag,
  increaseQuantity,
  decreaseQuantity,
  toggleSelectItem,
  toggleSelectAllItems,
  clearBag,
  setBagState,
} = bagSlice.actions;

export default bagSlice.reducer;
