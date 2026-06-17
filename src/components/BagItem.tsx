import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  toggleSelectItem,
} from '../redux/slices/bagSlice';
import { colors } from '../styles/colors';
import { TryNBuyIcon } from './SvgIcons';
import { CheckIcon, MinusIcon, PlusIcon, TrashIcon } from './CustomSvgIcons';

interface BagItemProps {
  id: number;
  productId: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  originalPrice?: number;
  discountPercentage?: number;
  isSelected?: boolean;
  description?: string;
}

export const BagItem: React.FC<BagItemProps> = ({
  productId,
  title,
  price,
  image,
  quantity,
  originalPrice,
  isSelected = true,
  description = 'Product description line 1\nProduct description line 2',
}) => {
  const dispatch = useDispatch();

  const handleToggleSelect = () => {
    dispatch(toggleSelectItem(productId));
  };

  return (
    <View style={styles.container}>
      {/* Product Image Container with checkbox overlay */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        
        {/* Blue Checkbox overlayed at top-left */}
        <TouchableOpacity
          style={[styles.checkbox, isSelected && styles.checkboxSelected]}
          onPress={handleToggleSelect}
          activeOpacity={0.7}
        >
          {isSelected && <CheckIcon width={10} height={10} color={colors.white} />}
        </TouchableOpacity>
      </View>

      {/* Product Details Column */}
      <View style={styles.detailsContainer}>
        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Multi-line Description */}
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        {/* Price Row (current price, original price, try n buy icon) */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{price}</Text>
          {originalPrice && (
            <Text style={styles.originalPrice}>₹{originalPrice}</Text>
          )}
          <TryNBuyIcon width={52} height={12} style={styles.tryNBuy} />
        </View>

        {/* Quantity Controls Pill capsule */}
        <View style={styles.quantityCapsule}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => dispatch(decreaseQuantity(productId))}
            activeOpacity={0.6}
          >
            {quantity === 1 ? (
              <TrashIcon width={13} height={13} color={colors.text} />
            ) : (
              <MinusIcon width={11} height={11} color={colors.text} />
            )}
          </TouchableOpacity>

          <Text style={styles.quantity}>{quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => dispatch(increaseQuantity(productId))}
            activeOpacity={0.6}
          >
            <PlusIcon width={11} height={11} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: '#ECEEF2',
    alignItems: 'flex-start',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  checkbox: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 10,
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary, // blue square
    borderColor: colors.primary,
  },
  imageContainer: {
    width: 105,
    height: 105,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ECEEF2',
    marginRight: 14,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'System',
  },
  description: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 14,
    fontFamily: 'System',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  originalPrice: {
    fontSize: 11,
    color: '#888888',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  tryNBuy: {
    marginLeft: 10,
  },
  quantityCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECEEF2',
    borderRadius: 15, // pill rounded capsule
    height: 30,
    width: 92,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  quantityButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'System',
    textAlign: 'center',
    minWidth: 16,
  },
});
