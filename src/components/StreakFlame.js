import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export const StreakFlame = ({ streak = 1, size = 'medium', showLabel = true }) => {
  const { colors, typography, borderRadius } = useTheme();

  const isSmall = size === 'small';
  const isLarge = size === 'large';

  const iconSize = isSmall ? 16 : isLarge ? 28 : 20;
  const textSize = isSmall ? 13 : isLarge ? 22 : 15;
  const paddingV = isSmall ? 4 : isLarge ? 8 : 6;
  const paddingH = isSmall ? 8 : isLarge ? 14 : 10;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.accentSoft,
          borderRadius: borderRadius.full,
          paddingVertical: paddingV,
          paddingHorizontal: paddingH,
          borderColor: colors.streak,
        },
      ]}
    >
      <Ionicons name="flame" size={iconSize} color={colors.streak} />
      <Text
        style={[
          styles.text,
          {
            color: colors.streak,
            fontSize: textSize,
            fontWeight: typography.fontWeight.heavy,
          },
        ]}
      >
        {streak}
      </Text>
      {showLabel && isLarge && (
        <Text style={[styles.labelText, { color: colors.textSecondary }]}>Day Streak</Text>
      )}
    </View>
  );
};

export const XPCounter = ({ xp = 0, size = 'medium' }) => {
  const { colors, typography, borderRadius } = useTheme();

  const isSmall = size === 'small';
  const isLarge = size === 'large';

  const iconSize = isSmall ? 15 : isLarge ? 26 : 18;
  const textSize = isSmall ? 13 : isLarge ? 20 : 15;
  const paddingV = isSmall ? 4 : isLarge ? 8 : 6;
  const paddingH = isSmall ? 8 : isLarge ? 14 : 10;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primarySoft,
          borderRadius: borderRadius.full,
          paddingVertical: paddingV,
          paddingHorizontal: paddingH,
          borderColor: colors.primaryLight,
        },
      ]}
    >
      <Ionicons name="sparkles" size={iconSize} color={colors.accent} />
      <Text
        style={[
          styles.text,
          {
            color: colors.primary,
            fontSize: textSize,
            fontWeight: typography.fontWeight.bold,
          },
        ]}
      >
        {xp} <Text style={{ fontSize: textSize - 2, fontWeight: '600' }}>XP</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    gap: 5,
  },
  text: {
    letterSpacing: 0.2,
  },
  labelText: {
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 2,
  },
});
