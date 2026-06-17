import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
  RefreshControl,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { SortIcon, FilterIcon, LineIcon } from '../components/CustomSvgIcons';
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
  console.log('=== PRODUCTSSCREEN RENDERING ===, loading:', true);
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

    // Separate gender/category filters from suggested filters
    const genderFilters = selectedCategories.filter(c => ['Men', 'Women', 'Boys', 'Girls', 'Unisex'].includes(c));
    const suggestedFilters = selectedCategories.filter(c => ['2 days delivery', 'Brown', 'Under ₹700', '50% off'].includes(c));

    // Apply gender category filter
    if (genderFilters.length > 0) {
      result = result.filter(p => genderFilters.includes(p.category));
    }

    // Apply suggested filters
    if (suggestedFilters.length > 0) {
      suggestedFilters.forEach(filter => {
        if (filter === 'Under ₹700') {
          result = result.filter(p => p.price < 700);
        } else if (filter === '50% off') {
          result = result.filter(p => p.discountPercentage !== undefined && p.discountPercentage >= 50);
        } else if (filter === 'Brown') {
          result = result.filter(p => p.brand === 'Savana');
        } else if (filter === '2 days delivery') {
          result = result.filter(p => p.brand === 'Vashions' || p.brand === 'Zudio');
        }
      });
    }

    // Apply sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'offers') {
      result.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
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
      brand={item.brand}
      originalPrice={item.originalPrice}
      discountPercentage={item.discountPercentage}
    />
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  const hasActiveFilters = selectedCategories.length > 0 || sortBy !== null;

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="T-shirts" isProductsScreen />
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Cart logo and action icons */}
      <Header
        title="T-shirts"
        isProductsScreen
        rightIconBadge={bagItems.reduce((acc, item) => acc + item.quantity, 0)}
        onRightIconPress={() => navigation.navigate('Bag')}
        onBackPress={() => Alert.alert('Back', 'Back arrow clicked')}
      />

      {/* Showing results label below header */}
      <View style={styles.resultsInfoContainer}>
        <Text style={styles.resultsText}>
          Showing <Text style={styles.resultsHighlight}>{filteredAndSorted.length} results</Text> for <Text style={styles.resultsUnderline}>Slim Fit XL Men's</Text> T-shirts
        </Text>
      </View>

      {/* Products List */}
      <FlatList
        data={filteredAndSorted}
        renderItem={renderProductCard}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
            <Text style={styles.emptyText}>No products match filters</Text>
          </View>
        }
      />

      {/* Floating Sort / Filter Pill at bottom center */}
      <View style={styles.floatingPillContainer}>
        <View style={styles.pillCard}>
          {/* Sort side */}
          <TouchableOpacity
            style={styles.pillButton}
            onPress={() => setShowSortModal(true)}
            activeOpacity={0.7}
          >
            <SortIcon width={15} height={17} color="#4342FF" />
            <Text style={styles.pillButtonText}>Sort by</Text>
          </TouchableOpacity>

          {/* Divider */}
          <LineIcon width={2} height={32} color="#4342FF" />

          {/* Filter side */}
          <TouchableOpacity
            style={styles.pillButton}
            onPress={() => setShowFilterModal(true)}
            activeOpacity={0.7}
          >
            <FilterIcon width={19} height={18} color="#4342FF" />
            <View style={styles.filterTextWrapper}>
              <Text style={styles.pillButtonText}>Filters</Text>
              {hasActiveFilters && <View style={styles.activeFilterDot} />}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sort Modal Sheet */}
      <SortModal
        visible={showSortModal}
        onClose={() => setShowSortModal(false)}
      />

      {/* Filter Modal Sheet */}
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
    backgroundColor: '#FFFFFF',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsInfoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  resultsText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'System',
  },
  resultsHighlight: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  resultsUnderline: {
    textDecorationLine: 'underline',
    color: colors.text,
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  listContent: {
    paddingBottom: 100, // padding to clear the floating pill
  },
  emptyText: {
    marginTop: 8,
    color: colors.textSecondary,
    fontSize: 14,
  },
  floatingPillContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
  pillCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#ECEEF2',
    height: 48,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },
  pillButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 6,
  },
  pillButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'System',
  },
  pillDivider: {
    width: 1.5,
    height: '50%',
    backgroundColor: '#ECEEF2',
  },
  filterTextWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeFilterDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    position: 'absolute',
    right: -8,
    top: 0,
  },
});
