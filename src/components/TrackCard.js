import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { ProgressBar } from './ProgressBar';

export const TrackCard = ({
  track,
  onPress,
  variant = 'vertical', // 'vertical' | 'horizontal' | 'compact'
  completedModules = 0,
  isEnrolled = false,
}) => {
  const { colors, typography, borderRadius, shadows } = useTheme();

  const total = track.totalModules || track.modules?.length || 5;
  const progress = total > 0 ? completedModules / total : 0;
  const percent = Math.round(progress * 100);

  if (variant === 'horizontal') {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onPress && onPress(track)}
        style={[
          styles.horizontalCard,
          {
            backgroundColor: colors.surfaceCard,
            borderRadius: borderRadius.lg,
            borderColor: colors.border,
            ...shadows.md,
          },
        ]}
      >
        <View style={styles.topRow}>
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: `${track.color || colors.primary}18` },
            ]}
          >
            <Ionicons
              name={track.iconName || 'code-slash'}
              size={22}
              color={track.color || colors.primary}
            />
          </View>
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: colors.surfaceElevated, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.categoryText, { color: colors.textSecondary }]}>
              {track.category}
            </Text>
          </View>
        </View>

        <Text
          numberOfLines={1}
          style={[
            styles.title,
            { color: colors.text, fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.bold },
          ]}
        >
          {track.title}
        </Text>

        <Text
          numberOfLines={2}
          style={[
            styles.description,
            { color: colors.textSecondary, fontSize: typography.fontSize.xs },
          ]}
        >
          {track.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.metaRow}>
            <Text style={[styles.metaText, { color: colors.textMuted }]}>
              {completedModules}/{total} modules
            </Text>
            <Text style={[styles.metaText, { color: colors.xp, fontWeight: '700' }]}>
              +{track.totalXP} XP
            </Text>
          </View>
          <ProgressBar progress={progress} color={track.color || colors.primary} height={6} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress && onPress(track)}
      style={[
        styles.verticalCard,
        {
          backgroundColor: colors.surfaceCard,
          borderRadius: borderRadius.xl,
          borderColor: colors.border,
          ...shadows.md,
        },
      ]}
    >
      <View style={styles.verticalHeader}>
        <View
          style={[
            styles.largeIconWrapper,
            { backgroundColor: `${track.color || colors.primary}15` },
          ]}
        >
          <Ionicons
            name={track.iconName || 'sparkles'}
            size={28}
            color={track.color || colors.primary}
          />
        </View>
        <View style={styles.headerTextGroup}>
          <View style={styles.categoryRow}>
            <Text
              style={[
                styles.categoryTag,
                { color: track.color || colors.primary, fontWeight: '700' },
              ]}
            >
              {track.category.toUpperCase()}
            </Text>
            {isEnrolled && (
              <View style={[styles.enrolledPill, { backgroundColor: colors.successSoft }]}>
                <Text style={[styles.enrolledText, { color: colors.success }]}>Enrolled</Text>
              </View>
            )}
          </View>
          <Text
            style={[
              styles.verticalTitle,
              { color: colors.text, fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold },
            ]}
          >
            {track.title}
          </Text>
        </View>
      </View>

      <Text
        numberOfLines={2}
        style={[
          styles.verticalDescription,
          { color: colors.textSecondary, fontSize: typography.fontSize.sm },
        ]}
      >
        {track.description}
      </Text>

      <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

      <View style={styles.verticalFooter}>
        <View style={styles.badgeItem}>
          <Ionicons name="book-outline" size={15} color={colors.textSecondary} />
          <Text style={[styles.badgeText, { color: colors.textSecondary }]}>
            {total} Sprints
          </Text>
        </View>
        <View style={styles.badgeItem}>
          <Ionicons name="time-outline" size={15} color={colors.textSecondary} />
          <Text style={[styles.badgeText, { color: colors.textSecondary }]}>
            {track.estimatedHours || '3 hrs'}
          </Text>
        </View>
        <View style={styles.badgeItem}>
          <Ionicons name="trophy-outline" size={15} color={colors.xp} />
          <Text style={[styles.badgeText, { color: colors.xp, fontWeight: '700' }]}>
            +{track.totalXP} XP
          </Text>
        </View>
      </View>

      {completedModules > 0 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressLabelRow}>
            <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
              Progress ({percent}%)
            </Text>
            <Text style={[styles.progressCount, { color: track.color || colors.primary }]}>
              {completedModules}/{total} Complete
            </Text>
          </View>
          <ProgressBar progress={progress} color={track.color || colors.primary} height={6} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  horizontalCard: {
    width: 260,
    padding: 16,
    marginRight: 14,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  title: {
    marginBottom: 6,
  },
  description: {
    lineHeight: 16,
    marginBottom: 14,
  },
  footer: {
    marginTop: 'auto',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  metaText: {
    fontSize: 12,
  },
  verticalCard: {
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
  },
  verticalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  largeIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  headerTextGroup: {
    flex: 1,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  categoryTag: {
    fontSize: 11,
    letterSpacing: 0.8,
  },
  enrolledPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  enrolledText: {
    fontSize: 10,
    fontWeight: '700',
  },
  verticalTitle: {
    marginTop: 2,
  },
  verticalDescription: {
    lineHeight: 20,
    marginBottom: 14,
  },
  divider: {
    height: 1,
    marginBottom: 12,
  },
  verticalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressContainer: {
    marginTop: 12,
    paddingTop: 10,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressCount: {
    fontSize: 12,
    fontWeight: '700',
  },
});
