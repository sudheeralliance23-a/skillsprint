import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { ModuleItem } from '../components/ModuleItem';
import { ProgressBar } from '../components/ProgressBar';

export const TrackDetailScreen = ({ navigation, route }) => {
  const { trackId } = route.params || { trackId: 'track-coding' };
  const { colors, typography, borderRadius, shadows } = useTheme();
  const { getTrackById, completedModuleIds, enrolledTrackIds, enrollInTrack } = useData();

  const track = getTrackById(trackId);

  if (!track) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.notFound}>
          <Text style={{ color: colors.text }}>Track not found.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: colors.primary, marginTop: 10 }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isEnrolled = enrolledTrackIds.includes(track.id);
  const totalModules = track.modules?.length || 0;
  const completedInTrack = track.modules
    ? track.modules.filter((m) => completedModuleIds.includes(m.id)).length
    : 0;
  const progressRatio = totalModules > 0 ? completedInTrack / totalModules : 0;
  const percentComplete = Math.round(progressRatio * 100);

  // Find the first uncompleted module or the first module
  const nextModule =
    track.modules?.find((m) => !completedModuleIds.includes(m.id)) ||
    track.modules?.[0];

  const handleStartOrResume = () => {
    if (!isEnrolled) {
      enrollInTrack(track.id);
    }
    if (nextModule) {
      navigation.navigate('Lesson', {
        moduleId: nextModule.id,
        trackId: track.id,
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Bar */}
      <View style={[styles.topBar, { borderBottomColor: colors.borderLight }]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={[styles.navButton, { backgroundColor: colors.surfaceElevated }]}
        >
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </TouchableOpacity>

        <Text
          numberOfLines={1}
          style={[
            styles.navTitle,
            { color: colors.text, fontSize: typography.fontSize.md, fontWeight: '700' },
          ]}
        >
          {track.title}
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => enrollInTrack(track.id)}
          style={[
            styles.enrollBadge,
            {
              backgroundColor: isEnrolled ? colors.successSoft : colors.primarySoft,
            },
          ]}
        >
          <Text
            style={[
              styles.enrollBadgeText,
              { color: isEnrolled ? colors.success : colors.primary },
            ]}
          >
            {isEnrolled ? 'Enrolled' : '+ Enroll'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Track Hero Banner */}
        <View
          style={[
            styles.heroBanner,
            {
              backgroundColor: colors.surfaceCard,
              borderColor: colors.border,
              borderRadius: borderRadius.xl,
              ...shadows.md,
            },
          ]}
        >
          <View style={styles.bannerHeader}>
            <View
              style={[
                styles.bannerIcon,
                { backgroundColor: `${track.color || colors.primary}18` },
              ]}
            >
              <Ionicons
                name={track.iconName || 'sparkles'}
                size={34}
                color={track.color || colors.primary}
              />
            </View>

            <View style={styles.bannerMetaGroup}>
              <View style={[styles.catBadge, { backgroundColor: colors.surfaceElevated }]}>
                <Text
                  style={[
                    styles.catBadgeText,
                    { color: track.color || colors.primary, fontWeight: '700' },
                  ]}
                >
                  {track.category.toUpperCase()}
                </Text>
              </View>
              <Text
                style={[
                  styles.bannerTitle,
                  {
                    color: colors.text,
                    fontSize: typography.fontSize.xxl,
                    fontWeight: typography.fontWeight.heavy,
                  },
                ]}
              >
                {track.title}
              </Text>
            </View>
          </View>

          <Text
            style={[
              styles.bannerDescription,
              { color: colors.textSecondary, fontSize: typography.fontSize.sm },
            ]}
          >
            {track.description}
          </Text>

          {/* Quick Stats Grid */}
          <View style={[styles.statsGrid, { borderColor: colors.borderLight }]}>
            <View style={styles.statCell}>
              <Ionicons name="trophy" size={16} color={colors.xp} />
              <Text style={[styles.statCellVal, { color: colors.xp, fontWeight: '700' }]}>
                +{track.totalXP} XP
              </Text>
              <Text style={[styles.statCellLabel, { color: colors.textMuted }]}>Reward</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.borderLight }]} />
            <View style={styles.statCell}>
              <Ionicons name="book" size={16} color={colors.primary} />
              <Text style={[styles.statCellVal, { color: colors.text, fontWeight: '700' }]}>
                {totalModules} Sprints
              </Text>
              <Text style={[styles.statCellLabel, { color: colors.textMuted }]}>Modules</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.borderLight }]} />
            <View style={styles.statCell}>
              <Ionicons name="time" size={16} color={colors.accentOrange} />
              <Text style={[styles.statCellVal, { color: colors.text, fontWeight: '700' }]}>
                {track.estimatedHours || '3 hrs'}
              </Text>
              <Text style={[styles.statCellLabel, { color: colors.textMuted }]}>Duration</Text>
            </View>
          </View>

          {/* Progress overview */}
          <View style={styles.trackProgressBox}>
            <View style={styles.progressTextRow}>
              <Text style={[styles.progressBoxLabel, { color: colors.textSecondary }]}>
                Track Completion ({percentComplete}%)
              </Text>
              <Text style={[styles.progressBoxCount, { color: track.color || colors.primary, fontWeight: '700' }]}>
                {completedInTrack}/{totalModules} Completed
              </Text>
            </View>
            <ProgressBar
              progress={progressRatio}
              color={track.color || colors.primary}
              height={8}
            />
          </View>
        </View>

        {/* Modules Roadmap List */}
        <View style={styles.roadmapSection}>
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
            Sprint Roadmap
          </Text>

          <View style={styles.roadmapList}>
            {track.modules.map((mod, index) => {
              const isCompleted = completedModuleIds.includes(mod.id);
              // A module is current if it's not completed AND either it's the 1st module or previous is completed
              const prevCompleted =
                index === 0 || completedModuleIds.includes(track.modules[index - 1].id);
              const isCurrent = !isCompleted && prevCompleted;
              const isLocked = !isCompleted && !prevCompleted;

              const status = isCompleted ? 'completed' : isCurrent ? 'current' : 'locked';

              return (
                <ModuleItem
                  key={mod.id}
                  module={mod}
                  status={status}
                  trackColor={track.color}
                  isLast={index === track.modules.length - 1}
                  onPress={(m) => {
                    navigation.navigate('Lesson', {
                      moduleId: m.id,
                      trackId: track.id,
                    });
                  }}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Action Bar */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.borderLight,
            ...shadows.lg,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleStartOrResume}
          style={[
            styles.ctaButton,
            {
              backgroundColor: track.color || colors.primary,
              borderRadius: borderRadius.full,
              ...shadows.glow(track.color || colors.primary),
            },
          ]}
        >
          <Text style={styles.ctaButtonText}>
            {completedInTrack === 0
              ? 'Start First Sprint'
              : completedInTrack === totalModules
              ? 'Review Sprints'
              : 'Resume Sprint ' + (nextModule ? nextModule.order : '')}
          </Text>
          <Ionicons name="play" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  navButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    flex: 1,
    marginHorizontal: 12,
  },
  enrollBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  enrollBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 110,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  heroBanner: {
    padding: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  bannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  bannerIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerMetaGroup: {
    flex: 1,
  },
  catBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  catBadgeText: {
    fontSize: 10,
  },
  bannerTitle: {
    lineHeight: 28,
  },
  bannerDescription: {
    lineHeight: 20,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  statCell: {
    alignItems: 'center',
    gap: 3,
  },
  statCellVal: {
    fontSize: 13,
  },
  statCellLabel: {
    fontSize: 11,
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  trackProgressBox: {
    gap: 6,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBoxLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  progressBoxCount: {
    fontSize: 11,
  },
  roadmapSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 14,
  },
  roadmapList: {
    paddingLeft: 4,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
  },
  ctaButton: {
    width: '100%',
    maxWidth: 540,
    alignSelf: 'center',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
