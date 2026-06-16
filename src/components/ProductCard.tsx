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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { addToBag } from '../redux/slices/bagSlice';
import { colors } from '../styles/colors';
import { formatPrice, truncateText, formatRating } from '../utils/helpers';
import { APP_STRINGS } from '../utils/constants';

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
  onPress?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  description,
  image,
  rating,
  onPress,
}) => {
  const dispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleAddToBag = () => {
    dispatch(addToBag({
      id,
      title,
      price,
      description,
      image,
      category: 'general',
      rating,
    }));
    
    Alert.alert(
      APP_STRINGS.ITEM_ADDED,
      title,
      [{ text: 'OK', onPress: () => {} }],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Image Container */}
      <View style={styles.imageContainer}>
        {imageLoading && (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={StyleSheet.absoluteFill}
          />
        )}
        
        <Image
          source={{ uri: image }}
          style={styles.image}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          onError={() => {
            setImageError(true);
            setImageLoading(false);
          }}
        />

        {imageError && (
          <View style={styles.imagePlaceholder}>
            <Icon name="image-off" size={40} color={colors.textTertiary} />
          </View>
        )}
      </View>

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {truncateText(title, 50)}
        </Text>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {truncateText(description, 80)}
        </Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Icon name="star" size={14} color="#FFB800" />
          <Text style={styles.rating}>
            {formatRating(rating.rate)} ({rating.count})
          </Text>
        </View>

        {/* Price and Add Button */}
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(price)}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddToBag}
            activeOpacity={0.7}
          >
            <Icon name="shopping-outline" size={18} color={colors.white} />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginHorizontal: 8,
    marginVertical: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imagePlaceholder: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  description: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 11,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.secondary,
  },
  addButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '600',
  },
});
