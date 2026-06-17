import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors } from '../styles/colors';

interface EmptyBagProps {
  onContinueShopping: () => void;
}

export const EmptyBag: React.FC<EmptyBagProps> = ({ onContinueShopping }) => {
  return (
    <View style={styles.container}>
      {/* OOPS Title */}
      <Text style={styles.oopsText}>OOPS ☹️</Text>
      
      {/* Subtitle */}
      <Text style={styles.subtitleText}>Your bag is empty.</Text>

      {/* Tote Bag Image */}
      <Image
        source={require('../../assets/tote-bag.png')}
        style={styles.toteBagImage}
      />

      {/* Call to action text */}
      <Text style={styles.actionPromptText}>Add items to your bag now</Text>

      {/* Start Shopping Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={onContinueShopping}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Start shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  oopsText: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.black,
    fontFamily: 'System',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'System',
    marginBottom: 40,
  },
  toteBagImage: {
    width: 226,
    height: 226,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  actionPromptText: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500',
    fontFamily: 'System',
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary, // #4E4BFC blue
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 24,
    width: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
});
