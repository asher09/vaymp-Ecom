import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../styles/colors';
import { APP_STRINGS } from '../utils/constants';

interface EmptyBagProps {
  onContinueShopping: () => void;
}

export const EmptyBag: React.FC<EmptyBagProps> = ({ onContinueShopping }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name="shopping-outline" size={80} color={colors.secondary} />
        </View>

        <Text style={styles.title}>{APP_STRINGS.BAG_EMPTY}</Text>

        <Text style={styles.subtitle}>
          Start adding items to fill your shopping bag
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={onContinueShopping}
          activeOpacity={0.8}
        >
          <Icon name="arrow-left" size={18} color={colors.white} />
          <Text style={styles.buttonText}>
            {APP_STRINGS.CONTINUE_SHOPPING}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
