export const SORT_OPTIONS = {
  PRICE_LOW_HIGH: 'price-low',
  PRICE_HIGH_LOW: 'price-high',
  RATING_HIGH_LOW: 'rating',
} as const;

export const SORT_LABELS = {
  'price-low': 'Price: Low to High',
  'price-high': 'Price: High to Low',
  'rating': 'Rating: High to Low',
} as const;

export const APP_STRINGS = {
  // Headers
  PRODUCTS: 'Products',
  BAG: 'Shopping Bag',
  SORT: 'Sort',
  FILTER: 'Filter',

  // Buttons
  ADD_TO_BAG: 'Add to Bag',
  REMOVE: 'Remove',
  APPLY: 'Apply',
  CANCEL: 'Cancel',
  CLEAR: 'Clear',
  CONTINUE_SHOPPING: 'Continue Shopping',
  CHECKOUT: 'Proceed to Checkout',

  // Messages
  BAG_EMPTY: 'Your shopping bag is empty',
  ITEM_ADDED: 'Added to bag!',
  ITEM_REMOVED: 'Removed from bag',
  NO_PRODUCTS: 'No products found',
  LOADING: 'Loading...',
  ERROR: 'Something went wrong',

  // Labels
  TOTAL_ITEMS: 'Total Items',
  GRAND_TOTAL: 'Grand Total',
  PRICE: 'Price',
  QUANTITY: 'Quantity',
  CATEGORY: 'Category',
} as const;

export const NUMERIC_CONSTANTS = {
  PRODUCT_GRID_COLUMNS: 2,
  PRODUCT_IMAGE_ASPECT_RATIO: 1,
  SCREEN_PADDING: 16,
  BORDER_RADIUS: 8,
  ICON_SIZE: 24,
  AVATAR_SIZE: 40,
} as const;

export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;
