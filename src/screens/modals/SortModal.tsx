import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOption } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';
import { colors } from '../../styles/colors';
import type { SortOption } from '../../types/product';

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
}

const SORT_ITEMS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest arrivals' },
  { value: 'price-low', label: 'Price - low to high' },
  { value: 'price-high', label: 'Price - high to low' },
  { value: 'offers', label: 'Offers and discounts' },
  { value: 'rating', label: 'Best sellers' },
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
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.sheetContainer}>
              <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Sort by</Text>
                </View>

                {/* Sort Options */}
                <View style={styles.content}>
                  {SORT_ITEMS.map((item) => {
                    const isSelected = selectedSort === item.value;
                    return (
                      <TouchableOpacity
                        key={item.value}
                        style={styles.sortItem}
                        onPress={() => handleSelectSort(item.value)}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.sortLabel,
                            isSelected && styles.sortLabelActive,
                          ]}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </SafeAreaView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
    paddingBottom: 24,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Shadow for Android
    elevation: 10,
  },
  safeArea: {
    width: '100%',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary, // #4E4BFC blue title
    fontFamily: 'System',
  },
  content: {
    width: '100%',
  },
  sortItem: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    fontFamily: 'System',
  },
  sortLabelActive: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
