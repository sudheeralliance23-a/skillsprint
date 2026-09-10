import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { TrackCard } from '../components/TrackCard';

export const AssessmentResultsScreen = ({ navigation, route }) => {
  const { colors, typography, borderRadius, shadows } = useTheme();
  const { recommendedTracks } = useData();
  const { isAuthenticated } = useAuth();

  const handleStartPath = () => {
    if (isAuthenticated) {
      navigation.navigate('MainTabs');
    } else {
      navigation.navigate('SignUp');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Hero */}
        <View style={styles.heroSection}>
          <View style={[styles.sparkleCircle, { backgroundColor: colors.accentSoft }]}>
            <Ionicons name="sparkles" size={36} color={colors.accentOrange} />
          </View>

          <Text
            style={[
              styles.heroTitle,
              {
                color: colors.text,
                fontSize: typography.fontSize.xxxl,
                fontWeight: typography.fontWeight.heavy,
              },
            ]}
          >
            Your AI Learning Path is Ready!
          </Text>

          <Text
            style={[
              styles.heroSubtitle,
              { color: colors.textSecondary, fontSize: typography.fontSize.md },
            ]}
          >
            Based on your goals and diagnostic answers, we've calibrated your starting sprint curriculum.
          </Text>
        </View>

        {/* AI Insight Box */}
        <View
          style={[
            styles.insightCard,
            {
              backgroundColor: colors.primarySoft,
              borderColor: colors.primaryLight,
              borderRadius: borderRadius.xl,
            },
          ]}
        >
          <View style={styles.insightHeader}>
            <Ionicons name="bulb" size={20} color={colors.primary} />
            <Text style={[styles.insightTitle, { color: colors.primary, fontWeight: '700' }]}>
              AI Calibration Insights
            </Text>
          </View>
          <Text style={[styles.insightText, { color: colors.text }]}>
            • Focus: Fast foundational mastery with active recall challenges
          </Text>
          <Text style={[styles.insightText, { color: colors.text }]}>
            • Target: 1 micro sprint (5-10 mins) per day to sustain momentum
          </Text>
          <Text style={[styles.insightText, { color: colors.text }]}>
            • Projected: Complete your first track certificate in ~14 days
          </Text>
        </View>

        {/* Recommended Tracks Section */}
        <View style={styles.tracksSection}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: colors.text,
                  fontSize: typography.fontSize.xl,
                  fontWeight: typography.fontWeight.bold,
                },
              ]}
            >
              Recommended Skill Tracks
            </Text>
            <View style={[styles.matchBadge, { backgroundColor: colors.successSoft }]}>
              <Text style={[styles.matchBadgeText, { color: colors.success }]}>98% Match</Text>
            </View>
          </View>

          {recommendedTracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              isEnrolled={true}
              onPress={() => {
                navigation.navigate('TrackDetail', { trackId: track.id });
              }}
            />
          ))}
        </View>

        {/* Action CTAs */}
        <View style={styles.ctaGroup}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleStartPath}
            style={[
              styles.primaryButton,
              {
                backgroundColor: colors.primary,
                borderRadius: borderRadius.full,
                ...shadows.glow(colors.primary),
              },
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {isAuthenticated ? 'Start My Sprints' : 'Create Account & Start My Path'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {!isAuthenticated && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Login')}
              style={[
                styles.secondaryButton,
                {
                  backgroundColor: colors.surfaceCard,
                  borderColor: colors.border,
                  borderRadius: borderRadius.full,
                },
              ]}
            >
              <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
                Already registered? Log In
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 32,
    paddingBottom: 40,
    maxWidth: 540,
    alignSelf: 'center',
    width: '100%',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  sparkleCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 8,
  },
  heroSubtitle: {
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  insightCard: {
    padding: 16,
    borderWidth: 1,
    gap: 8,
    marginBottom: 28,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  insightTitle: {
    fontSize: 14,
  },
  insightText: {
    fontSize: 13,
    lineHeight: 18,
  },
  tracksSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {},
  matchBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  ctaGroup: {
    gap: 12,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
