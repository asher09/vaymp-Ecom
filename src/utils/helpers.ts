/**
 * Format price to currency
 */
export const formatPrice = (price: number, currency: string = '₹'): string => {
  return `${currency} ${price.toFixed(2)}`;
};

/**
 * Format rating with stars
 */
export const formatRating = (rate: number): string => {
  return `${rate.toFixed(1)} ★`;
};

/**
 * Truncate text
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Debounce function
 */
export const debounce = (func: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Group products by category
 */
export const groupByCategory = (products: any[]): Record<string, any[]> => {
  return products.reduce((groups, product) => {
    const category = product.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {});
};

/**
 * Validate email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (originalPrice: number, discountedPrice: number): number => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Wait/Sleep function
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
