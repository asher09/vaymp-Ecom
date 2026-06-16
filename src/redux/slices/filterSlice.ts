import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '../../types/filter';
import { SortOption } from '../../types/product';

const initialState: FilterState = {
  selectedCategories: [],
  sortBy: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },

    setSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
    },

    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const index = state.selectedCategories.indexOf(category);

      if (index > -1) {
        // Remove if already selected
        state.selectedCategories.splice(index, 1);
      } else {
        // Add if not selected
        state.selectedCategories.push(category);
      }
    },

    clearFilters: (state) => {
      state.selectedCategories = [];
      state.sortBy = null;
    },

    clearCategoryFilter: (state) => {
      state.selectedCategories = [];
    },

    clearSortFilter: (state) => {
      state.sortBy = null;
    },
  },
});

export const {
  setSortOption,
  setSelectedCategories,
  toggleCategory,
  clearFilters,
  clearCategoryFilter,
  clearSortFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
