import axios, { AxiosError } from 'axios';
import { Product } from '../types/product';

const API_BASE = 'https://fakestoreapi.com';

// Create axios instance with timeout
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const productApi = {
  /**
   * Get all products
   */
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get<Product[]>('/products');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error fetching products:', axiosError.message);
      throw error;
    }
  },

  /**
   * Get products by category
   */
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await api.get<Product[]>(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(`Error fetching products for category ${category}:`, axiosError.message);
      throw error;
    }
  },

  /**
   * Get all available categories
   */
  getCategories: async (): Promise<string[]> => {
    try {
      const response = await api.get<string[]>('/products/categories');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error fetching categories:', axiosError.message);
      throw error;
    }
  },

  /**
   * Get single product by ID
   */
  getProductById: async (id: number): Promise<Product> => {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(`Error fetching product ${id}:`, axiosError.message);
      throw error;
    }
  },
};
