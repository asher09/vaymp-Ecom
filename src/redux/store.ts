import { configureStore } from '@reduxjs/toolkit';
import bagReducer from './slices/bagSlice';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    bag: bagReducer,
    filter: filterReducer,
  },
});

export const persistor = {
  persist: () => {},
  subscribe: () => () => {},
  getState: () => ({ bootstrapped: true }),
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
