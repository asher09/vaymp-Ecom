import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  BAG_ITEMS: 'bag_items',
  FILTER_PREFERENCES: 'filter_prefs',
  USER_DATA: 'user_data',
};

/**
 * Save data to AsyncStorage
 */
export const saveToStorage = async (key: string, data: any): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    console.log(`✓ Saved to storage: ${key}`);
    return true;
  } catch (error) {
    console.error(`✗ Error saving to storage (${key}):`, error);
    return false;
  }
};

/**
 * Retrieve data from AsyncStorage
 */
export const getFromStorage = async (key: string): Promise<any | null> => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      console.log(`✓ Retrieved from storage: ${key}`);
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error(`✗ Error retrieving from storage (${key}):`, error);
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 */
export const removeFromStorage = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`✓ Removed from storage: ${key}`);
    return true;
  } catch (error) {
    console.error(`✗ Error removing from storage (${key}):`, error);
    return false;
  }
};

/**
 * Clear all AsyncStorage
 */
export const clearAllStorage = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    console.log('✓ Cleared all storage');
    return true;
  } catch (error) {
    console.error('✗ Error clearing storage:', error);
    return false;
  }
};

export { STORAGE_KEYS };
