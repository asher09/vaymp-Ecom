import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../styles/colors';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightIcon?: string;
  rightIconBadge?: number;
  onRightIconPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBackPress,
  rightIcon,
  rightIconBadge,
  onRightIconPress,
}) => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
      />
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {showBack && (
            <TouchableOpacity
              onPress={onBackPress}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={24} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.rightContainer}>
          {rightIcon && (
            <TouchableOpacity
              onPress={onRightIconPress}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <Icon name={rightIcon} size={24} color={colors.white} />
              {rightIconBadge !== undefined && rightIconBadge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {rightIconBadge > 99 ? '99+' : rightIconBadge}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 8,
  },
  leftContainer: {
    width: 40,
  },
  rightContainer: {
    width: 40,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    flex: 1,
  },
  iconButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    right: -4,
    top: -4,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
});
