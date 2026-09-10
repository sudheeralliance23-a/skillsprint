import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { ProgressBar } from './ProgressBar';

export const DailyGoalCard = ({
  target = 1,
  progress = 0,
  onPressAction,
}) => {
  const { colors, typography, borderRadius, shadows } = useTheme();

  const isAchieved = progress >= target;
  const progressRatio = target > 0 ? Math.min(1, progress / target) : 0;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isAchieved ? colors.successSoft : colors.surfaceCard,
          borderColor: isAchieved ? colors.success : colors.border,
          borderWidth: isAchieved ? 1.5 : 1,
          borderRadius: borderRadius.xl,
          ...shadows.sm,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <View
            style={[
              styles.iconWrapper,
              {
                backgroundColor: isAchieved ? colors.success : colors.accentSoft,
              },
            ]}
          >
            <Ionicons
              name={isAchieved ? 'checkmark-circle' : 'flag'}
              size={20}
              color={isAchieved ? '#FFFFFF' : colors.accent}
            />
          </View>
          <View>
            <Text
              style={[
                styles.title,
                { color: colors.text, fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.bold },
              ]}
            >
              Daily Sprint Target
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: typography.fontSize.xs }]}>
              {isAchieved
                ? 'Daily goal completed! +50 Streak XP awarded'
                : `Complete ${target - progress} more sprint to lock in today's streak`}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.countPill,
            {
              backgroundColor: isAchieved ? colors.success : colors.primarySoft,
            },
          ]}
        >
          <Text
            style={[
              styles.countText,
              { color: isAchieved ? '#FFFFFF' : colors.primary },
            ]}
          >
            {progress}/{target}
          </Text>
        </View>
      </View>

      <View style={styles.progressRow}>
        <ProgressBar
          progress={progressRatio}
          color={isAchieved ? colors.success : colors.accent}
          height={8}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 8,
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 2,
  },
  subtitle: {
    lineHeight: 16,
  },
  countPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  countText: {
    fontSize: 13,
    fontWeight: '700',
  },
  progressRow: {
    marginTop: 2,
  },
});
