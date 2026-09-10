import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export const ActivityHeatmap = ({ weeklyActivity = [] }) => {
  const { colors, typography, borderRadius, shadows } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceCard,
          borderRadius: borderRadius.xl,
          borderColor: colors.border,
          ...shadows.sm,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="calendar-outline" size={18} color={colors.primary} />
          <Text
            style={[
              styles.title,
              { color: colors.text, fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.bold },
            ]}
          >
            Weekly Sprint Activity
          </Text>
        </View>
        <Text style={[styles.streakPill, { color: colors.streak }]}>7 Days Active</Text>
      </View>

      <View style={styles.daysRow}>
        {weeklyActivity.map((dayItem, index) => {
          const hasActivity = dayItem.completed > 0;
          const isToday = index === weeklyActivity.length - 1;

          return (
            <View key={index} style={styles.dayCol}>
              <View
                style={[
                  styles.dayDot,
                  {
                    backgroundColor: hasActivity ? colors.primary : colors.surfaceElevated,
                    borderColor: isToday ? colors.accent : colors.border,
                    borderWidth: isToday ? 2 : 1,
                  },
                ]}
              >
                {hasActivity ? (
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                ) : (
                  <View style={[styles.innerEmptyDot, { backgroundColor: colors.border }]} />
                )}
              </View>
              <Text
                style={[
                  styles.dayName,
                  {
                    color: isToday ? colors.primary : colors.textSecondary,
                    fontWeight: isToday ? '700' : '500',
                  },
                ]}
              >
                {dayItem.day}
              </Text>
              <Text style={[styles.xpCount, { color: colors.textMuted }]}>
                {dayItem.xp > 0 ? `+${dayItem.xp}` : '-'}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export const RadarSkillChart = ({ tracks = [], completedModuleIds = [] }) => {
  const { colors, typography, borderRadius, shadows } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceCard,
          borderRadius: borderRadius.xl,
          borderColor: colors.border,
          ...shadows.sm,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="stats-chart" size={18} color={colors.accent} />
          <Text
            style={[
              styles.title,
              { color: colors.text, fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.bold },
            ]}
          >
            Skill Mastery Breakdown
          </Text>
        </View>
      </View>

      <View style={styles.barsList}>
        {tracks.map((track) => {
          const totalMods = track.modules?.length || track.totalModules || 5;
          const completedCount = track.modules
            ? track.modules.filter((m) => completedModuleIds.includes(m.id)).length
            : 0;
          const ratio = totalMods > 0 ? completedCount / totalMods : 0;
          const percent = Math.round(ratio * 100);

          return (
            <View key={track.id} style={styles.skillBarItem}>
              <View style={styles.skillInfoRow}>
                <View style={styles.skillNameGroup}>
                  <View
                    style={[
                      styles.colorIndicator,
                      { backgroundColor: track.color || colors.primary },
                    ]}
                  />
                  <Text
                    numberOfLines={1}
                    style={[styles.skillName, { color: colors.text, fontWeight: '600' }]}
                  >
                    {track.title}
                  </Text>
                </View>
                <Text style={[styles.skillPercent, { color: track.color || colors.primary }]}>
                  {percent}% ({completedCount}/{totalMods})
                </Text>
              </View>

              <View
                style={[
                  styles.barBackground,
                  { backgroundColor: colors.surfaceElevated, borderRadius: 4 },
                ]}
              >
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${Math.max(8, percent)}%`,
                      backgroundColor: track.color || colors.primary,
                      borderRadius: 4,
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {},
  streakPill: {
    fontSize: 12,
    fontWeight: '700',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayCol: {
    alignItems: 'center',
    gap: 4,
  },
  dayDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerEmptyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dayName: {
    fontSize: 11,
    marginTop: 2,
  },
  xpCount: {
    fontSize: 10,
  },
  barsList: {
    gap: 12,
  },
  skillBarItem: {
    gap: 6,
  },
  skillInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillNameGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    marginRight: 8,
  },
  colorIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  skillName: {
    fontSize: 13,
  },
  skillPercent: {
    fontSize: 12,
    fontWeight: '700',
  },
  barBackground: {
    height: 8,
    width: '100%',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
  },
});
