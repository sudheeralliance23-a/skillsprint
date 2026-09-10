import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export const ModuleItem = ({
  module,
  status = 'locked', // 'completed' | 'current' | 'locked'
  onPress,
  isLast = false,
  trackColor,
}) => {
  const { colors, typography, borderRadius, shadows } = useTheme();

  const isCompleted = status === 'completed';
  const isCurrent = status === 'current';
  const isLocked = status === 'locked';

  const accentColor = trackColor || colors.primary;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.timelineColumn}>
        <View
          style={[
            styles.nodeCircle,
            {
              backgroundColor: isCompleted
                ? colors.success
                : isCurrent
                ? accentColor
                : colors.surfaceElevated,
              borderColor: isCompleted
                ? colors.success
                : isCurrent
                ? accentColor
                : colors.border,
            },
          ]}
        >
          {isCompleted ? (
            <Ionicons name="checkmark-sharp" size={16} color="#FFFFFF" />
          ) : isCurrent ? (
            <Ionicons name="play" size={14} color="#FFFFFF" style={{ marginLeft: 2 }} />
          ) : (
            <Ionicons name="lock-closed" size={14} color={colors.textMuted} />
          )}
        </View>
        {!isLast && (
          <View
            style={[
              styles.timelineLine,
              {
                backgroundColor: isCompleted ? colors.success : colors.border,
              },
            ]}
          />
        )}
      </View>

      <TouchableOpacity
        activeOpacity={isLocked ? 1 : 0.8}
        onPress={() => !isLocked && onPress && onPress(module)}
        style={[
          styles.card,
          {
            backgroundColor: isCurrent ? colors.surfaceElevated : colors.surfaceCard,
            borderColor: isCurrent ? accentColor : colors.border,
            borderWidth: isCurrent ? 2 : 1,
            borderRadius: borderRadius.lg,
            opacity: isLocked ? 0.6 : 1,
            ...(isCurrent ? shadows.md : shadows.sm),
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.orderPill}>
            <Text style={[styles.orderText, { color: colors.textSecondary }]}>
              Sprint {module.order}
            </Text>
          </View>
          <View style={styles.xpPill}>
            <Ionicons name="sparkles" size={12} color={colors.xp} />
            <Text style={[styles.xpText, { color: colors.xp, fontWeight: '700' }]}>
              +{module.xpReward} XP
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontSize: typography.fontSize.md,
              fontWeight: isCurrent ? typography.fontWeight.bold : typography.fontWeight.semiBold,
            },
          ]}
        >
          {module.title}
        </Text>

        <Text
          numberOfLines={2}
          style={[
            styles.summary,
            { color: colors.textSecondary, fontSize: typography.fontSize.xs },
          ]}
        >
          {module.summary}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.timeTag}>
            <Ionicons name="time-outline" size={13} color={colors.textMuted} />
            <Text style={[styles.timeText, { color: colors.textMuted }]}>
              {module.estimatedMinutes} mins
            </Text>
          </View>

          {isCompleted && (
            <View style={styles.completedTag}>
              <Ionicons name="checkmark-circle" size={14} color={colors.success} />
              <Text style={[styles.completedText, { color: colors.success }]}>Completed</Text>
            </View>
          )}

          {isCurrent && (
            <View style={[styles.startTag, { backgroundColor: accentColor }]}>
              <Text style={styles.startTagText}>Start Sprint</Text>
              <Ionicons name="arrow-forward" size={12} color="#FFFFFF" />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  timelineColumn: {
    alignItems: 'center',
    width: 36,
    marginRight: 10,
  },
  nodeCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    marginTop: 12,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  card: {
    flex: 1,
    padding: 14,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  orderPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  orderText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  xpPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  xpText: {
    fontSize: 11,
  },
  title: {
    marginBottom: 4,
  },
  summary: {
    lineHeight: 16,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
  },
  completedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  completedText: {
    fontSize: 12,
    fontWeight: '700',
  },
  startTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  startTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
