import { Product } from '../types/product';

// Mock products database matching the design images exactly
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    brand: 'Vashions',
    title: 'Light Faded Blue Puff Jacket',
    price: 1249,
    originalPrice: 3499,
    discountPercentage: 64,
    description: 'Ultra-light warm puff jacket with premium patchwork denim texture and comfortable fleece collar.',
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=600&auto=format&fit=crop',
    rating: { rate: 4.5, count: 120 },
    isFavorite: false,
  },
  {
    id: 2,
    brand: 'Zudio',
    title: 'Full-Sleeve White Shirt',
    price: 599,
    originalPrice: 2199,
    discountPercentage: 73,
    description: 'Classic white button-down shirt with a clean, minimalist fit for smart-casual wear.',
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600&auto=format&fit=crop',
    rating: { rate: 4.2, count: 85 },
    isFavorite: false,
  },
  {
    id: 3,
    brand: 'Savana',
    title: 'Light Faded Blue Puff Jacket',
    price: 1249,
    description: 'Mandarin collar patterned shirt in deep indigo with elegant printed details.',
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=600&auto=format&fit=crop',
    rating: { rate: 4.0, count: 60 },
    isFavorite: false,
  },
  {
    id: 4,
    brand: 'Vashions',
    title: 'Light Faded Blue Puff Jacket',
    price: 1249,
    description: 'Comfortable cotton blend round neck t-shirt in sky blue.',
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop',
    rating: { rate: 4.3, count: 95 },
    isFavorite: false,
  },
  {
    id: 5,
    brand: 'Vashions',
    title: 'Puff Jacket Style V2',
    price: 1399,
    originalPrice: 3999,
    discountPercentage: 65,
    description: 'Warm and trendy jacket.',
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop',
    rating: { rate: 4.7, count: 150 },
    isFavorite: false,
  },
  {
    id: 6,
    brand: 'Zudio',
    title: 'Premium Linen Shirt',
    price: 799,
    originalPrice: 1999,
    discountPercentage: 60,
    description: 'Linen casual shirt in beige.',
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop',
    rating: { rate: 4.1, count: 45 },
    isFavorite: false,
  },
  {
    id: 7,
    brand: 'Zara',
    title: 'Summer Cotton Dress',
    price: 1499,
    originalPrice: 2999,
    discountPercentage: 50,
    description: 'Elegant light cotton dress for warm days.',
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop',
    rating: { rate: 4.4, count: 110 },
    isFavorite: false,
  },
  {
    id: 8,
    brand: 'H&M',
    title: 'Casual Denim Jacket',
    price: 1899,
    originalPrice: 3499,
    discountPercentage: 45,
    description: 'Women denim jacket.',
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop',
    rating: { rate: 4.6, count: 210 },
    isFavorite: false,
  }
];

export const productApi = {
  /**
   * Get all products
   */
  getAllProducts: async (): Promise<Product[]> => {
    // Return a shallow copy of mock products to simulate network API call
    return [...MOCK_PRODUCTS];
  },

  /**
   * Get products by category
   */
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    return MOCK_PRODUCTS.filter(
      p => p.category.toLowerCase() === category.toLowerCase()
    );
  },

  /**
   * Get all filter categories shown on the Filter sidebar in screenshots
   */
  getCategories: async (): Promise<string[]> => {
    return [
      'Suggested fliters',
      'New arrivals',
      'Gender',
      'Price',
      'Brand',
      'Fabric',
      'Fit',
      'Size',
      'Color',
      'Discounts',
      'Delivery time',
    ];
  },

  /**
   * Get single product by ID
   */
  getProductById: async (id: number): Promise<Product> => {
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    if (!product) {
      throw new Error(`Product not found: ${id}`);
    }
    return { ...product };
  },
};
