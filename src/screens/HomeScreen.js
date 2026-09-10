import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { StreakFlame, XPCounter } from '../components/StreakFlame';
import { TrackCard } from '../components/TrackCard';
import { DailyGoalCard } from '../components/DailyGoalCard';
import { ProgressBar } from '../components/ProgressBar';

export const HomeScreen = ({ navigation }) => {
  const { colors, typography, borderRadius, shadows } = useTheme();
  const { user } = useAuth();
  const {
    tracks,
    enrolledTrackIds,
    completedModuleIds,
    userStats,
    recommendedTracks,
    refreshing,
    refreshData,
  } = useData();

  // Find active in-progress track and next module
  const enrolledTracks = tracks.filter((t) => enrolledTrackIds.includes(t.id));
  const activeTrack = enrolledTracks[0] || tracks[0];

  let nextModule = null;
  if (activeTrack) {
    nextModule =
      activeTrack.modules.find((m) => !completedModuleIds.includes(m.id)) ||
      activeTrack.modules[0];
  }

  const completedInActive = activeTrack
    ? activeTrack.modules.filter((m) => completedModuleIds.includes(m.id)).length
    : 0;
  const totalInActive = activeTrack?.modules?.length || 5;
  const activeProgress = totalInActive > 0 ? completedInActive / totalInActive : 0;

  const displayName = user?.name ? user.name.split(' ')[0] : 'Learner';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Navbar */}
      <View style={[styles.navbar, { borderBottomColor: colors.borderLight }]}>
        <View style={styles.greetingGroup}>
          <Text style={[styles.greetingSub, { color: colors.textSecondary }]}>Welcome back,</Text>
          <Text
            style={[
              styles.greetingName,
              {
                color: colors.text,
                fontSize: typography.fontSize.xxl,
                fontWeight: typography.fontWeight.heavy,
              },
            ]}
          >
            {displayName} 👋
          </Text>
        </View>

        <View style={styles.statusBadges}>
          <StreakFlame streak={userStats.currentStreak || 1} size="medium" />
          <XPCounter xp={userStats.totalXP || 0} size="medium" />
        </View>
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
        {/* Continue Learning Banner */}
        {activeTrack && nextModule && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
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
                Continue Sprint
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('TrackDetail', { trackId: activeTrack.id })}
              >
                <Text style={[styles.viewAllLink, { color: colors.primary }]}>View Track</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() =>
                navigation.navigate('Lesson', {
                  moduleId: nextModule.id,
                  trackId: activeTrack.id,
                })
              }
              style={[
                styles.continueCard,
                {
                  backgroundColor: colors.surfaceCard,
                  borderColor: colors.border,
                  borderRadius: borderRadius.xl,
                  ...shadows.md,
                },
              ]}
            >
              <View style={styles.continueHeader}>
                <View
                  style={[
                    styles.continueIcon,
                    { backgroundColor: `${activeTrack.color || colors.primary}18` },
                  ]}
                >
                  <Ionicons
                    name={activeTrack.iconName || 'code-slash'}
                    size={28}
                    color={activeTrack.color || colors.primary}
                  />
                </View>

                <View style={styles.continueTextCol}>
                  <Text style={[styles.continueTrackTag, { color: activeTrack.color || colors.primary }]}>
                    {activeTrack.title}
                  </Text>
                  <Text
                    style={[
                      styles.continueModTitle,
                      {
                        color: colors.text,
                        fontSize: typography.fontSize.md,
                        fontWeight: typography.fontWeight.bold,
                      },
                    ]}
                  >
                    Sprint {nextModule.order}: {nextModule.title}
                  </Text>
                </View>
              </View>

              <View style={styles.continueProgressRow}>
                <View style={styles.progressLabelLine}>
                  <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
                    Track Progress ({Math.round(activeProgress * 100)}%)
                  </Text>
                  <Text style={[styles.progressCount, { color: colors.textSecondary }]}>
                    {completedInActive}/{totalInActive} Sprints
                  </Text>
                </View>
                <ProgressBar
                  progress={activeProgress}
                  color={activeTrack.color || colors.primary}
                  height={8}
                />
              </View>

              <View style={[styles.resumeActionRow, { borderTopColor: colors.borderLight }]}>
                <View style={styles.timeEstimate}>
                  <Ionicons name="time-outline" size={14} color={colors.textMuted} />
                  <Text style={[styles.timeEstimateText, { color: colors.textMuted }]}>
                    {nextModule.estimatedMinutes} mins • +{nextModule.xpReward} XP
                  </Text>
                </View>

                <View
                  style={[
                    styles.resumePill,
                    {
                      backgroundColor: activeTrack.color || colors.primary,
                      borderRadius: borderRadius.full,
                    },
                  ]}
                >
                  <Text style={styles.resumePillText}>Resume Sprint</Text>
                  <Ionicons name="play" size={12} color="#FFFFFF" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Daily Goal Widget */}
        <DailyGoalCard
          target={userStats.dailyGoalTarget || 1}
          progress={userStats.dailyGoalProgress || 0}
          onPressAction={() => {
            if (activeTrack && nextModule) {
              navigation.navigate('Lesson', {
                moduleId: nextModule.id,
                trackId: activeTrack.id,
              });
            }
          }}
        />

        {/* Recommended Tracks Carousel */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleWithBadge}>
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
                Recommended For You
              </Text>
              <View style={[styles.aiBadge, { backgroundColor: colors.accentSoft }]}>
                <Ionicons name="sparkles" size={11} color={colors.accentOrange} />
                <Text style={[styles.aiBadgeText, { color: colors.accentOrange }]}>AI Picks</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ExploreTab')}
            >
              <Text style={[styles.viewAllLink, { color: colors.primary }]}>Explore All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
            {recommendedTracks.map((track) => {
              const comp = track.modules
                ? track.modules.filter((m) => completedModuleIds.includes(m.id)).length
                : 0;
              return (
                <TrackCard
                  key={track.id}
                  track={track}
                  variant="horizontal"
                  completedModules={comp}
                  isEnrolled={enrolledTrackIds.includes(track.id)}
                  onPress={() => navigation.navigate('TrackDetail', { trackId: track.id })}
                />
              );
            })}
          </ScrollView>
        </View>

        {/* Enrolled Tracks Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
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
              My Enrolled Tracks ({enrolledTracks.length})
            </Text>
          </View>

          <View style={styles.enrolledList}>
            {enrolledTracks.map((track) => {
              const comp = track.modules
                ? track.modules.filter((m) => completedModuleIds.includes(m.id)).length
                : 0;
              return (
                <TrackCard
                  key={track.id}
                  track={track}
                  variant="vertical"
                  completedModules={comp}
                  isEnrolled={true}
                  onPress={() => navigation.navigate('TrackDetail', { trackId: track.id })}
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
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  greetingGroup: {
    gap: 2,
  },
  greetingSub: {
    fontSize: 12,
    fontWeight: '500',
  },
  greetingName: {
    letterSpacing: -0.3,
  },
  statusBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  section: {
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {},
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  aiBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  viewAllLink: {
    fontSize: 13,
    fontWeight: '700',
  },
  continueCard: {
    padding: 18,
    borderWidth: 1,
  },
  continueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 14,
  },
  continueIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueTextCol: {
    flex: 1,
  },
  continueTrackTag: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  continueModTitle: {},
  continueProgressRow: {
    gap: 6,
    marginBottom: 14,
  },
  progressLabelLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  progressCount: {
    fontSize: 11,
    fontWeight: '600',
  },
  resumeActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  timeEstimate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeEstimateText: {
    fontSize: 12,
  },
  resumePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  resumePillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  carousel: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  enrolledList: {
    gap: 4,
  },
});
