import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { BackArrowIcon, WishlistIcon, BagIcon, LogoIcon } from './SvgIcons';
import { SearchIcon } from './CustomSvgIcons';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightIcon?: string;
  rightIconBadge?: number;
  onRightIconPress?: () => void;
  isProductsScreen?: boolean;
  onSearchPress?: () => void;
  onHeartPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = true,
  onBackPress,
  rightIcon,
  rightIconBadge = 0,
  onRightIconPress,
  isProductsScreen = false,
  onSearchPress,
  onHeartPress,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.headerBg} />
      <View style={styles.container}>
        {/* Left Side */}
        <View style={styles.leftContainer}>
          {showBack && (
            <TouchableOpacity
              onPress={onBackPress}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <BackArrowIcon width={14} height={24} color="#111827" />
            </TouchableOpacity>
          )}

          {isProductsScreen && (
            <View style={styles.logoContainer}>
              <LogoIcon style={styles.logoIcon} />
              <Text style={styles.logoText}>{title}</Text>
            </View>
          )}
        </View>

        {/* Center / Non-product title */}
        {!isProductsScreen && (
          <View style={styles.centerContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}

        {/* Right Side */}
        <View style={styles.rightContainer}>
          {isProductsScreen ? (
            <View style={styles.rightActionsRow}>
              <TouchableOpacity onPress={onSearchPress} style={styles.rightIconButton}>
                <SearchIcon width={21.43} height={22.34} color="#111827" />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={onHeartPress} style={styles.rightIconButton}>
                <WishlistIcon width={24} height={22} color="#111827" />
              </TouchableOpacity>

              <TouchableOpacity onPress={onRightIconPress} style={styles.rightIconButton}>
                <BagIcon width={22} height={25} color="#111827" />
                {rightIconBadge > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {rightIconBadge > 99 ? '99+' : rightIconBadge}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            // Bag screen layout has a heart icon on the right
            title.toLowerCase() === 'bag' && (
              <TouchableOpacity onPress={onHeartPress} style={styles.iconButton}>
                <WishlistIcon width={24} height={22} color="#111827" />
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.headerBg,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.headerBg,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.border,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  logoIcon: {
    marginRight: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'System',
  },
  centerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'System',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 40,
  },
  rightActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 6,
  },
  rightIconButton: {
    padding: 6,
    marginLeft: 8,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: colors.primary,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: 'bold',
  },
});
