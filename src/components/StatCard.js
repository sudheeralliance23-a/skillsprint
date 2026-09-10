import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export const StatCard = ({
  title,
  value,
  subtitle,
  iconName = 'analytics',
  iconColor,
  backgroundColor,
}) => {
  const { colors, typography, borderRadius, shadows } = useTheme();

  const color = iconColor || colors.primary;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor || colors.surfaceCard,
          borderRadius: borderRadius.lg,
          borderColor: colors.border,
          ...shadows.sm,
        },
      ]}
    >
      <View style={styles.topRow}>
        <Text style={[styles.title, { color: colors.textSecondary, fontSize: typography.fontSize.xs }]}>
          {title}
        </Text>
        <View style={[styles.iconBox, { backgroundColor: `${color}18` }]}>
          <Ionicons name={iconName} size={18} color={color} />
        </View>
      </View>

      <Text
        style={[
          styles.value,
          {
            color: colors.text,
            fontSize: typography.fontSize.xxl,
            fontWeight: typography.fontWeight.heavy,
          },
        ]}
      >
        {value}
      </Text>

      {subtitle && (
        <Text style={[styles.subtitle, { color: colors.textMuted, fontSize: typography.fontSize.xs }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export const BadgeCard = ({ badge, isUnlocked = false }) => {
  const { colors, typography, borderRadius, shadows } = useTheme();

  const badgeColor = isUnlocked ? colors.badgeGold : colors.textMuted;

  return (
    <View
      style={[
        styles.badgeContainer,
        {
          backgroundColor: isUnlocked ? colors.surfaceCard : colors.surfaceElevated,
          borderColor: isUnlocked ? colors.badgeGold : colors.border,
          borderWidth: isUnlocked ? 1.5 : 1,
          borderRadius: borderRadius.lg,
          opacity: isUnlocked ? 1 : 0.65,
          ...(isUnlocked ? shadows.md : {}),
        },
      ]}
    >
      <View
        style={[
          styles.badgeIconCircle,
          {
            backgroundColor: isUnlocked ? colors.accentSoft : colors.borderLight,
            borderColor: isUnlocked ? colors.badgeGold : colors.border,
          },
        ]}
      >
        <Ionicons name={badge.icon || 'trophy'} size={24} color={badgeColor} />
      </View>

      <Text
        numberOfLines={1}
        style={[
          styles.badgeTitle,
          {
            color: colors.text,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.bold,
          },
        ]}
      >
        {badge.title}
      </Text>

      <Text
        numberOfLines={2}
        style={[
          styles.badgeDescription,
          { color: colors.textSecondary, fontSize: typography.fontSize.xs },
        ]}
      >
        {badge.description}
      </Text>

      <View
        style={[
          styles.badgeStatusPill,
          {
            backgroundColor: isUnlocked ? colors.successSoft : colors.borderLight,
          },
        ]}
      >
        <Ionicons
          name={isUnlocked ? 'checkmark-circle' : 'lock-closed'}
          size={12}
          color={isUnlocked ? colors.success : colors.textMuted}
        />
        <Text
          style={[
            styles.badgeStatusText,
            { color: isUnlocked ? colors.success : colors.textMuted },
          ]}
        >
          {isUnlocked ? `+${badge.xpBonus} XP` : 'Locked'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderWidth: 1,
    flex: 1,
    minWidth: '45%',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    marginBottom: 2,
  },
  subtitle: {
    fontWeight: '500',
  },
  badgeContainer: {
    width: '48%',
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  badgeTitle: {
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDescription: {
    textAlign: 'center',
    lineHeight: 15,
    marginBottom: 10,
    minHeight: 30,
  },
  badgeStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeStatusText: {
    fontSize: 10,
    fontWeight: '700',
  },
});
