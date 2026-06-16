import { SortOption } from './product';

export interface FilterState {
  selectedCategories: string[];
  sortBy: SortOption;
}
