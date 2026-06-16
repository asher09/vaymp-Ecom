import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  removeFromBag,
  increaseQuantity,
  decreaseQuantity,
} from '../redux/slices/bagSlice';
import { colors } from '../styles/colors';
import { formatPrice } from '../utils/helpers';

interface BagItemProps {
  id: number;
  productId: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export const BagItem: React.FC<BagItemProps> = ({
  id,
  productId,
  title,
  price,
  image,
  quantity,
}) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    Alert.alert(
      'Remove Item',
      `Remove "${title}" from bag?`,
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Remove',
          onPress: () => dispatch(removeFromBag(productId)),
          style: 'destructive',
        },
      ]
    );
  };

  const itemTotal = price * quantity;

  return (
    <View style={styles.container}>
      {/* Product Image */}
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
            <Icon name="trash-can-outline" size={18} color={colors.error} />
          </TouchableOpacity>
        </View>

        <Text style={styles.price}>{formatPrice(price)}</Text>

        {/* Quantity Controls */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => dispatch(decreaseQuantity(productId))}
          >
            <Icon name="minus" size={16} color={colors.primary} />
          </TouchableOpacity>

          <Text style={styles.quantity}>{quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => dispatch(increaseQuantity(productId))}
          >
            <Icon name="plus" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Item Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.itemTotal}>{formatPrice(itemTotal)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.background,
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  title: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  price: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondary,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    width: 100,
  },
  quantityButton: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  totalContainer: {
    marginLeft: 12,
    alignItems: 'flex-end',
  },
  itemTotal: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
});
