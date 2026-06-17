import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategories } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';
import { colors } from '../../styles/colors';
import { productApi } from '../../api/productApi';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

// Map categories to their helper instructions
const CATEGORY_SUBTITLES: Record<string, string> = {
  'Suggested fliters': 'Choose from the mostly used filters',
  'Gender': 'Select gender',
  'Price': 'Select price range',
  'Brand': 'Select brands',
  'Color': 'Select colors',
  'Size': 'Select size',
};

// Mock options for categories to display in the right column
const MOCK_OPTIONS: Record<string, string[]> = {
  'Suggested fliters': ['2 days delivery', 'Brown', 'Under ₹700', '50% off'],
  'Gender': ['Men', 'Women', 'Boys', 'Girls', 'Unisex'],
  'Price': ['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', 'Above ₹2000'],
  'Brand': ['Vashions', 'Zudio', 'Savana', 'Zara', 'H&M'],
  'Color': ['Blue', 'White', 'Purple', 'Red', 'Brown', 'Black'],
  'Size': ['S', 'M', 'L', 'XL', 'XXL'],
  'New arrivals': ['Last 7 days', 'Last 30 days'],
  'Fabric': ['Cotton', 'Polyester', 'Linen', 'Denim'],
  'Fit': ['Slim Fit', 'Regular Fit', 'Loose Fit'],
  'Discounts': ['10% and above', '30% and above', '50% and above'],
  'Delivery time': ['Same day', 'Next day', '2-3 days'],
};

export const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<string>('Suggested fliters');
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>([]);

  const selectedCategories = useSelector(
    (state: RootState) => state.filter.selectedCategories
  );

  // Sync state when modal becomes visible
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
      if (data.length > 0 && !data.includes(selectedSection)) {
        setSelectedSection(data[0]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleToggleOption = (option: string) => {
    setTempSelectedCategories((prev) => {
      if (prev.includes(option)) {
        return prev.filter((o) => o !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleApplyFilters = () => {
    dispatch(setSelectedCategories(tempSelectedCategories));
    onClose();
  };

  const handleClearFilters = () => {
    setTempSelectedCategories([]);
  };

  const currentOptions = MOCK_OPTIONS[selectedSection] || [];
  const currentSubtitle = CATEGORY_SUBTITLES[selectedSection] || 'Choose filters';

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
                  <Text style={styles.headerTitle}>Filters</Text>
                </View>

                {/* Body split pane */}
                <View style={styles.body}>
                  {/* Left Column - Category List */}
                  <View style={styles.leftPane}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {categories.map((category) => {
                        const isSelected = selectedSection === category;
                        return (
                          <TouchableOpacity
                            key={category}
                            style={[
                              styles.categoryItem,
                              isSelected && styles.categoryItemActive,
                            ]}
                            onPress={() => setSelectedSection(category)}
                            activeOpacity={0.7}
                          >
                            {isSelected && <View style={styles.activeIndicator} />}
                            <Text
                              style={[
                                styles.categoryText,
                                isSelected && styles.categoryTextActive,
                              ]}
                            >
                              {category}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>

                  {/* Right Column - Options Pills */}
                  <View style={styles.rightPane}>
                    <Text style={styles.sectionSubtitle}>{currentSubtitle}</Text>
                    <ScrollView
                      contentContainerStyle={styles.pillsContainer}
                      showsVerticalScrollIndicator={false}
                    >
                      {currentOptions.map((option) => {
                        const isSelected = tempSelectedCategories.includes(option);
                        return (
                          <TouchableOpacity
                            key={option}
                            style={[
                              styles.pill,
                              isSelected && styles.pillSelected,
                            ]}
                            onPress={() => handleToggleOption(option)}
                            activeOpacity={0.7}
                          >
                            <Text
                              style={[
                                styles.pillText,
                                isSelected && styles.pillTextSelected,
                              ]}
                            >
                              {option}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>

                {/* Footer Buttons */}
                <View style={styles.footer}>
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={handleClearFilters}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.clearButtonText}>Clear all</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.applyButton}
                    onPress={handleApplyFilters}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.applyButtonText}>Apply filter</Text>
                  </TouchableOpacity>
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
    height: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1.5,
    borderBottomColor: '#ECEEF2',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary, // #4E4BFC blue title
    fontFamily: 'System',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPane: {
    width: '38%',
    backgroundColor: '#F2F4F7',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  categoryItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    position: 'relative',
    justifyContent: 'center',
  },
  categoryItemActive: {
    backgroundColor: '#FFFFFF',
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3.5,
    backgroundColor: colors.primary, // Blue vertical line on left
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4B5563',
    fontFamily: 'System',
  },
  categoryTextActive: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  rightPane: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
    fontFamily: 'System',
    fontWeight: '500',
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingBottom: 20,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    marginBottom: 4,
  },
  pillSelected: {
    borderColor: colors.primary,
  },
  pillText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
    fontFamily: 'System',
  },
  pillTextSelected: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1.5,
    borderTopColor: '#ECEEF2',
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: 'System',
  },
  applyButton: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
    fontFamily: 'System',
  },
});
