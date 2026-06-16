import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { SortModal } from './modals/SortModal';
import { FilterModal } from './modals/FilterModal';
import { productApi } from '../api/productApi';
import { RootState } from '../redux/store';
import { colors } from '../styles/colors';
import type { Product } from '../types/product';

interface ProductsScreenProps {
  navigation: any;
}

export const ProductsScreen: React.FC<ProductsScreenProps> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const bagItems = useSelector((state: RootState) => state.bag.items);
  const selectedCategories = useSelector(
    (state: RootState) => state.filter.selectedCategories
  );
  const sortBy = useSelector((state: RootState) => state.filter.sortBy);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productApi.getAllProducts();
      setProducts(data);
    } catch (err) {
      Alert.alert('Error', 'Failed to load products. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Apply filters and sorting
  const filteredAndSorted = useMemo(() => {
    let result = [...products];

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Apply sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return result;
  }, [products, selectedCategories, sortBy]);

  const renderProductCard = ({ item }: { item: Product }) => (
    <ProductCard
      id={item.id}
      title={item.title}
      price={item.price}
      description={item.description}
      image={item.image}
      rating={item.rating}
      onPress={() => {
        // Optional: Navigate to product details
      }}
    />
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Products" />
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Products"
        rightIcon="shopping-outline"
        rightIconBadge={bagItems.length}
        onRightIconPress={() => navigation.navigate('Bag')}
      />

      {/* Filter and Sort Bar */}
      <View style={styles.controlBar}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowFilterModal(true)}
        >
          <Icon name="filter-outline" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowSortModal(true)}
        >
          <Icon name="sort" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Products List */}
      <FlatList
        data={filteredAndSorted}
        renderItem={renderProductCard}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.centerContent}>
            <Icon name="inbox" size={48} color={colors.textTertiary} />
          </View>
        }
      />

      {/* Sort Modal */}
      <SortModal
        visible={showSortModal}
        onClose={() => setShowSortModal(false)}
      />

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
});
