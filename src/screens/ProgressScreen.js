import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { StatCard, BadgeCard } from '../components/StatCard';
import { ActivityHeatmap, RadarSkillChart } from '../components/ActivityHeatmap';

export const ProgressScreen = () => {
  const { colors, typography, borderRadius, shadows } = useTheme();
  const {
    tracks,
    achievements,
    completedModuleIds,
    unlockedAchievementIds,
    userStats,
    weeklyActivity,
    refreshing,
    refreshData,
  } = useData();

  const totalPossibleModules = tracks.reduce((acc, t) => acc + (t.modules?.length || 0), 0);
  const totalCompleted = completedModuleIds.length;
  const completionRate = totalPossibleModules > 0 ? Math.round((totalCompleted / totalPossibleModules) * 100) : 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.borderLight }]}>
        <Text
          style={[
            styles.headerTitle,
            {
              color: colors.text,
              fontSize: typography.fontSize.xxl,
              fontWeight: typography.fontWeight.heavy,
            },
          ]}
        >
          My Progress & XP
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary, fontSize: typography.fontSize.xs }]}>
          Track your streaks, skill mastery, and earned trophies
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshData}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {/* Core Stats 2x2 Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <StatCard
              title="Total XP"
              value={`${userStats.totalXP || 0}`}
              subtitle="Top 10% this week"
              iconName="sparkles"
              iconColor={colors.xp}
            />
            <StatCard
              title="Day Streak"
              value={`${userStats.currentStreak || 1} 🔥`}
              subtitle={`Best: ${userStats.bestStreak || userStats.currentStreak || 1} days`}
              iconName="flame"
              iconColor={colors.streak}
            />
          </View>

          <View style={styles.statsRow}>
            <StatCard
              title="Sprints Done"
              value={`${totalCompleted}`}
              subtitle={`${completionRate}% total curriculum`}
              iconName="checkmark-done-circle"
              iconColor={colors.success}
            />
            <StatCard
              title="Skill Level"
              value="Level 4"
              subtitle="Prodigy Tier"
              iconName="ribbon"
              iconColor={colors.primary}
            />
          </View>
        </View>

        {/* Weekly Activity Calendar */}
        <ActivityHeatmap weeklyActivity={weeklyActivity} />

        {/* Category Skill Mastery Radar/Bar Chart */}
        <RadarSkillChart tracks={tracks} completedModuleIds={completedModuleIds} />

        {/* Achievement Badges Section */}
        <View style={styles.badgesSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.badgeHeaderTitle}>
              <Ionicons name="trophy" size={20} color={colors.badgeGold} />
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: colors.text,
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.bold,
                  },
                ]}
              >
                Achievement Badges
              </Text>
            </View>
            <Text style={[styles.badgeCountPill, { color: colors.primary, fontWeight: '700' }]}>
              {unlockedAchievementIds.length}/{achievements.length} Unlocked
            </Text>
          </View>

          <View style={styles.badgesGrid}>
            {achievements.map((badge) => {
              const isUnlocked = unlockedAchievementIds.includes(badge.id);
              return (
                <BadgeCard
                  key={badge.id}
                  badge={badge}
                  isUnlocked={isUnlocked}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  headerTitle: {
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    marginTop: 2,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  statsGrid: {
    gap: 12,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  badgesSection: {
    marginTop: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeHeaderTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {},
  badgeCountPill: {
    fontSize: 12,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
