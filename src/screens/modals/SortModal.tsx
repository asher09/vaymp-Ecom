import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setSortOption } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';
import { colors } from '../../styles/colors';
import { SORT_OPTIONS, SORT_LABELS, APP_STRINGS } from '../../utils/constants';
import type { SortOption } from '../../types/product';

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
}

const SORT_ITEMS: { value: SortOption; label: string }[] = [
  { value: SORT_OPTIONS.PRICE_LOW_HIGH as SortOption, label: SORT_LABELS['price-low'] },
  { value: SORT_OPTIONS.PRICE_HIGH_LOW as SortOption, label: SORT_LABELS['price-high'] },
  { value: SORT_OPTIONS.RATING_HIGH_LOW as SortOption, label: SORT_LABELS['rating'] },
];

export const SortModal: React.FC<SortModalProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const selectedSort = useSelector((state: RootState) => state.filter.sortBy);

  const handleSelectSort = (sortOption: SortOption) => {
    dispatch(setSortOption(sortOption));
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sort Products</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Sort Options */}
        <View style={styles.content}>
          {SORT_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={styles.sortItem}
              onPress={() => handleSelectSort(item.value)}
            >
              <View
                style={[
                  styles.radio,
                  selectedSort === item.value && styles.radioSelected,
                ]}
              >
                {selectedSort === item.value && (
                  <View style={styles.radioDot} />
                )}
              </View>
              <Text style={styles.sortLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Clear Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              dispatch(setSortOption(null));
              onClose();
            }}
          >
            <Text style={styles.clearButtonText}>{APP_STRINGS.CLEAR}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingVertical: 12,
  },
  sortItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
