import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BagItem, BagState } from '../../types/bag';
import { Product } from '../../types/product';

const initialState: BagState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  loading: false,
};

// Helper function to update totals
const updateTotals = (state: BagState) => {
  state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
  clearBag,
  setBagState,
} = bagSlice.actions;

export default bagSlice.reducer;
