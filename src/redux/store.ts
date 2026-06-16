import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import bagReducer from './slices/bagSlice';
import filterReducer from './slices/filterSlice';

// Persist configuration - only persist bag items
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['bag'], // Only persist bag state
  blacklist: ['filter'], // Don't persist filters
  version: 1,
};

// Create persisted reducer
const persistedBagReducer = persistReducer(persistConfig, bagReducer);

export const store = configureStore({
  reducer: {
    bag: persistedBagReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Export types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Export hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
