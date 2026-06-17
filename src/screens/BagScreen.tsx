import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { RootState } from '../redux/store';
import { Header } from '../components/Header';
import { BagItem } from '../components/BagItem';
import { EmptyBag } from '../components/EmptyBag';
import { colors } from '../styles/colors';
import { toggleSelectAllItems, clearBag } from '../redux/slices/bagSlice';
import { DownArrowIcon, BlueTickIcon, DeliveryBoyIcon } from '../components/CustomSvgIcons';

interface BagScreenProps {
  navigation: any;
}

export const BagScreen: React.FC<BagScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const bagItems = useSelector((state: RootState) => state.bag.items);
  const totalItems = useSelector((state: RootState) => state.bag.totalItems);
  const totalPrice = useSelector((state: RootState) => state.bag.totalPrice);

  const renderBagItem = ({ item }: { item: any }) => (
    <BagItem
      id={item.id}
      productId={item.productId}
      title={item.title}
      price={item.price}
      image={item.image}
      quantity={item.quantity}
      originalPrice={item.originalPrice}
      discountPercentage={item.discountPercentage}
      isSelected={item.isSelected}
      description={item.description}
    />
  );

  const isEmpty = bagItems.length === 0;

  if (isEmpty) {
    return (
      <View style={styles.container}>
        <Header title="Bag" showBack={true} onBackPress={() => navigation.navigate('Products')} />
        <EmptyBag onContinueShopping={() => navigation.navigate('Products')} />
      </View>
    );
  }

  // Calculate if all items are selected
  const allSelected = bagItems.every(item => item.isSelected);

  const handleToggleSelectAll = () => {
    dispatch(toggleSelectAllItems(!allSelected));
  };

  const handleProceedToPay = () => {
    if (totalItems === 0) {
      Alert.alert('Cannot Proceed', 'Please select at least one item to proceed to pay.');
      return;
    }
    Alert.alert(
      'Payment Success',
      `Your payment of ₹${totalPrice} for ${totalItems} item(s) was successful!`,
      [
        {
          text: 'Great!',
          onPress: () => {
            dispatch(clearBag()); // clear bag on successful mock payment
            navigation.navigate('Products');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header showing '< Bag' and heart outline icon */}
      <Header
        title="Bag"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        onHeartPress={() => Alert.alert('Favorites', 'Wishlist clicked')}
      />

      {/* Main Content List */}
      <FlatList
        data={bagItems}
        renderItem={renderBagItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* Delivery address details section */}
            <View style={styles.deliveryContainer}>
              <View style={styles.deliveryLeftRow}>
                <DeliveryBoyIcon style={styles.deliveryIcon} />
                <View style={styles.deliveryTextCol}>
                  <Text style={styles.deliveryHeadline}>Delivering in just 60 min</Text>
                  <Text style={styles.deliveryAddress} numberOfLines={1}>
                    Full address - 29 Aparna Complex, Gurgaon...
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.deliveryExpandButton} activeOpacity={0.6}>
                <DownArrowIcon width={14.3} height={8.78} color="#676769" style={styles.expandIcon} />
              </TouchableOpacity>
            </View>

            {/* FREE Delivery banner */}
            <View style={styles.freeDeliveryBanner}>
              <BlueTickIcon style={styles.tickIcon} />
              <Text style={styles.freeDeliveryText}>
                Yayy! Your order is eligible for FREE delivery.
              </Text>
            </View>

            {/* Select/Deselect all items link */}
            <View style={styles.selectToggleContainer}>
              <TouchableOpacity onPress={handleToggleSelectAll} activeOpacity={0.7}>
                <Text style={styles.selectToggleText}>
                  {allSelected ? 'Deselect all items' : 'Select all items'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />

      {/* Bottom Summary CTA Bar */}
      <View style={styles.payBarContainer}>
        <TouchableOpacity
          style={styles.payButton}
          activeOpacity={0.85}
          onPress={handleProceedToPay}
        >
          <Text style={styles.payButtonText}>Proceed to pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    paddingBottom: 100, // padding to clear bottom absolute pay bar
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1.5,
    borderBottomColor: '#ECEEF2',
  },
  deliveryLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  deliveryIcon: {
    marginRight: 12,
  },
  deliveryTextCol: {
    flex: 1,
  },
  deliveryHeadline: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'System',
  },
  deliveryAddress: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
    fontFamily: 'System',
  },
  deliveryExpandButton: {
    padding: 4,
  },
  expandIcon: {},
  freeDeliveryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6', // soft background tint
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: '#ECEEF2',
  },
  tickIcon: {
    marginRight: 10,
  },
  freeDeliveryText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.primary, // blue text
    fontFamily: 'System',
    flex: 1,
  },
  selectToggleContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1.5,
    borderBottomColor: '#ECEEF2',
  },
  selectToggleText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.primary, // blue text
    fontFamily: 'System',
  },
  payBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopWidth: 1.5,
    borderTopColor: '#ECEEF2',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  payButton: {
    backgroundColor: colors.primary, // blue payment button
    paddingVertical: 14,
    borderRadius: 24,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  payButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
});
