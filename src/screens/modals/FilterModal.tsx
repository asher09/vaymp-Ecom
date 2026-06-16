import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setSelectedCategories } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';
import { colors } from '../../styles/colors';
import { APP_STRINGS } from '../../utils/constants';
import { productApi } from '../../api/productApi';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>([]);

  const selectedCategories = useSelector(
    (state: RootState) => state.filter.selectedCategories
  );

  // Fetch categories when modal opens
  useEffect(() => {
    if (visible) {
      fetchCategories();
      setTempSelectedCategories([...selectedCategories]);
    }
  }, [visible]);

  const fetchCategories = async () => {
    try {
      const data = await productApi.getCategories();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const handleToggleCategory = (category: string) => {
    setTempSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleApplyFilters = () => {
    dispatch(setSelectedCategories(tempSelectedCategories));
    onClose();
  };

  const handleClearFilters = () => {
    setTempSelectedCategories([]);
    dispatch(setSelectedCategories([]));
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
          <Text style={styles.headerTitle}>Filters</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Category</Text>

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.categoryItem}
                onPress={() => handleToggleCategory(category)}
              >
                <View
                  style={[
                    styles.checkbox,
                    tempSelectedCategories.includes(category) &&
                      styles.checkboxChecked,
                  ]}
                >
                  {tempSelectedCategories.includes(category) && (
                    <Icon name="check" size={14} color={colors.white} />
                  )}
                </View>
                <Text style={styles.categoryLabel}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearFilters}
          >
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApplyFilters}
          >
            <Text style={styles.applyButtonText}>{APP_STRINGS.APPLY}</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    textTransform: 'capitalize',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
});
