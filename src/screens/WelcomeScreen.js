import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const WelcomeScreen = ({ navigation }) => {
  const { colors, typography, borderRadius, shadows } = useTheme();
  const { loginAsDemo } = useAuth();

  const handleDemoLogin = async () => {
    await loginAsDemo();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Logo & App Branding */}
        <View style={styles.heroSection}>
          <View
            style={[
              styles.logoCircle,
              {
                backgroundColor: colors.primary,
                ...shadows.glow(colors.primary),
              },
            ]}
          >
            <Ionicons name="flash" size={44} color="#FFFFFF" />
          </View>

          <Text
            style={[
              styles.appName,
              {
                color: colors.text,
                fontSize: typography.fontSize.display,
                fontWeight: typography.fontWeight.heavy,
              },
            ]}
          >
            Skill<Text style={{ color: colors.primary }}>Sprint</Text>
          </Text>

          <View style={[styles.taglineBadge, { backgroundColor: colors.accentSoft }]}>
            <Ionicons name="sparkles" size={14} color={colors.accentOrange} />
            <Text style={[styles.taglineBadgeText, { color: colors.accentOrange }]}>
              AI-Powered Skill Acceleration
            </Text>
          </View>

          <Text
            style={[
              styles.heroSubtitle,
              { color: colors.textSecondary, fontSize: typography.fontSize.md },
            ]}
          >
            Master coding, public speaking, data analytics, and career leadership in gamified 5-minute sprints.
          </Text>
        </View>

        {/* Value Proposition Highlights */}
        <View style={styles.featuresList}>
          <View
            style={[
              styles.featureCard,
              {
                backgroundColor: colors.surfaceCard,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                ...shadows.sm,
              },
            ]}
          >
            <View style={[styles.featureIcon, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="sparkles-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.featureTextGroup}>
              <Text style={[styles.featureTitle, { color: colors.text, fontWeight: '700' }]}>
                AI Personalized Roadmap
              </Text>
              <Text style={[styles.featureBody, { color: colors.textSecondary }]}>
                Take a 1-minute assessment and get custom-tailored sprint modules.
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.featureCard,
              {
                backgroundColor: colors.surfaceCard,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                ...shadows.sm,
              },
            ]}
          >
            <View style={[styles.featureIcon, { backgroundColor: colors.accentSoft }]}>
              <Ionicons name="flame" size={22} color={colors.streak} />
            </View>
            <View style={styles.featureTextGroup}>
              <Text style={[styles.featureTitle, { color: colors.text, fontWeight: '700' }]}>
                Gamified Daily Streaks & XP
              </Text>
              <Text style={[styles.featureBody, { color: colors.textSecondary }]}>
                Level up, unlock trophies, and build permanent skill-building habits.
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.featureCard,
              {
                backgroundColor: colors.surfaceCard,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                ...shadows.sm,
              },
            ]}
          >
            <View style={[styles.featureIcon, { backgroundColor: colors.successSoft }]}>
              <Ionicons name="trophy-outline" size={20} color={colors.success} />
            </View>
            <View style={styles.featureTextGroup}>
              <Text style={[styles.featureTitle, { color: colors.text, fontWeight: '700' }]}>
                Real-World Micro-Quizzes
              </Text>
              <Text style={[styles.featureBody, { color: colors.textSecondary }]}>
                Practical, scenario-driven questions with instant conceptual feedback.
              </Text>
            </View>
          </View>
        </View>

        {/* CTAs */}
        <View style={styles.ctaGroup}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Assessment')}
            style={[
              styles.primaryButton,
              {
                backgroundColor: colors.primary,
                borderRadius: borderRadius.full,
                ...shadows.glow(colors.primary),
              },
            ]}
          >
            <Text style={styles.primaryButtonText}>Get Started (Take Assessment)</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>

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
              I already have an account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleDemoLogin}
            style={styles.demoLink}
          >
            <Text style={[styles.demoLinkText, { color: colors.primaryLight }]}>
              ⚡ Instant Demo Mode (Jump In as Alex)
            </Text>
          </TouchableOpacity>
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
    paddingTop: 36,
    paddingBottom: 40,
    alignItems: 'center',
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  taglineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 14,
  },
  taglineBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  heroSubtitle: {
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  featuresList: {
    width: '100%',
    gap: 12,
    marginBottom: 32,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    gap: 14,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTextGroup: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    marginBottom: 3,
  },
  featureBody: {
    fontSize: 12,
    lineHeight: 16,
  },
  ctaGroup: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
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
  demoLink: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  demoLinkText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
