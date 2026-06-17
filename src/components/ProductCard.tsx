import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { addToBag } from '../redux/slices/bagSlice';
import { colors } from '../styles/colors';
import { formatPrice, truncateText } from '../utils/helpers';
import { APP_STRINGS } from '../utils/constants';
import { TryNBuyIcon } from './SvgIcons';
import { LikeOnItemsIcon } from './CustomSvgIcons';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  brand?: string;
  originalPrice?: number;
  discountPercentage?: number;
  onPress?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  description,
  image,
  rating,
  brand = 'Vashions',
  originalPrice,
  discountPercentage,
  onPress,
}) => {
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToBag = () => {
    dispatch(
      addToBag({
        id,
        title,
        price,
        description,
        image,
        category: 'Men',
        rating,
        brand,
        originalPrice,
        discountPercentage,
      })
    );

    Alert.alert(
      APP_STRINGS.ITEM_ADDED,
      `"${title}" has been added to your shopping bag.`,
      [{ text: 'OK', onPress: () => {} }],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress || handleAddToBag}
      activeOpacity={0.9}
    >
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          onError={() => {
            setImageError(true);
          }}
        />

        {imageError && (
          <View style={styles.imagePlaceholder}>
            <Icon name="image-off" size={36} color={colors.textTertiary} />
          </View>
        )}

        {/* Heart Icon Overlay */}
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => setIsFavorite(!isFavorite)}
          activeOpacity={0.7}
        >
          <LikeOnItemsIcon
            filled={isFavorite}
            width={16}
            height={15}
            color={isFavorite ? colors.secondary : '#888888'}
          />
        </TouchableOpacity>
      </View>

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Brand */}
        <Text style={styles.brand} numberOfLines={1}>
          {brand}
        </Text>

        {/* Title */}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {/* Price Row */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{price}</Text>

          {/* TRY N BUY logo */}
          <TryNBuyIcon style={styles.tryNBuyIcon} />
        </View>

        {/* Discount Row (Original Price and Discount) */}
        {originalPrice && discountPercentage ? (
          <View style={styles.discountRow}>
            <Text style={styles.originalPrice}>₹{originalPrice}</Text>
            <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
          </View>
        ) : (
          <View style={styles.discountRowSpacer} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: 8,
    marginVertical: 10,
    maxWidth: '48%',
  },
  imageContainer: {
    width: '100%',
    height: 190,
    backgroundColor: '#EAEAEA',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 2,
  },
  brand: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  title: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.text,
  },
  tryNBuyIcon: {
    marginLeft: 8,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  originalPrice: {
    fontSize: 10,
    color: '#888888',
    textDecorationLine: 'line-through',
  },
  discountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: 6,
  },
  discountRowSpacer: {
    height: 14, // keeps height consistent when no discount row exists
  },
});
