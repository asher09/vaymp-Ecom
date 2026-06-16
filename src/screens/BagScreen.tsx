import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  RefreshControl,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Header } from '../components/Header';
import { BagItem } from '../components/BagItem';
import { EmptyBag } from '../components/EmptyBag';
import { colors } from '../styles/colors';
import { formatPrice } from '../utils/helpers';
import { APP_STRINGS } from '../utils/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface BagScreenProps {
  navigation: any;
}

export const BagScreen: React.FC<BagScreenProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  
  const bagItems = useSelector((state: RootState) => state.bag.items);
  const totalItems = useSelector((state: RootState) => state.bag.totalItems);
  const totalPrice = useSelector((state: RootState) => state.bag.totalPrice);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  const renderBagItem = ({ item }: { item: any }) => (
    <BagItem
      id={item.id}
      productId={item.productId}
      title={item.title}
      price={item.price}
      image={item.image}
      quantity={item.quantity}
    />
  );

  const isEmpty = bagItems.length === 0;

  if (isEmpty) {
    return (
      <View style={styles.container}>
        <Header title={APP_STRINGS.BAG} />
        <EmptyBag onContinueShopping={() => navigation.navigate('Products')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title={APP_STRINGS.BAG} />

      <FlatList
        data={bagItems}
        renderItem={renderBagItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
          />
        }
      />

      {/* Bottom Summary */}
      <View style={styles.summaryContainer}>
        {/* Items count */}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>{APP_STRINGS.TOTAL_ITEMS}:</Text>
          <Text style={styles.summaryValue}>{totalItems}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Total price */}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>{APP_STRINGS.GRAND_TOTAL}:</Text>
          <Text style={styles.totalPrice}>{formatPrice(totalPrice)}</Text>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity
          style={styles.checkoutButton}
          activeOpacity={0.8}
          onPress={() => {
            // Handle checkout
          }}
        >
          <Icon name="check-circle-outline" size={20} color={colors.white} />
          <Text style={styles.checkoutButtonText}>
            {APP_STRINGS.CHECKOUT}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingVertical: 8,
  },
  summaryContainer: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  checkoutButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
