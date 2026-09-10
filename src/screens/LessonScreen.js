import React, { useState } from 'react';
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
import { ProgressBar } from '../components/ProgressBar';
import { QuizQuestion } from '../components/QuizQuestion';
import { CelebrationModal } from '../components/CelebrationModal';

export const LessonScreen = ({ navigation, route }) => {
  const { moduleId, trackId } = route.params || {
    moduleId: 'mod-code-1',
    trackId: 'track-coding',
  };
  const { colors, typography, borderRadius, shadows } = useTheme();
  const { getModuleById, completeModule, userStats, getTrackById } = useData();

  const moduleData = getModuleById(moduleId);
  const track = getTrackById(trackId) || moduleData?.track;

  const contentSections = moduleData?.contentSections || [];
  const quizQuestions = moduleData?.quiz || [];
  const totalSteps = contentSections.length + quizQuestions.length;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [earnedXP, setEarnedXP] = useState(moduleData?.xpReward || 150);

  if (!moduleData) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.notFound}>
          <Text style={{ color: colors.text }}>Module not found.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: colors.primary, marginTop: 10 }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const progress = (currentStepIndex + 1) / Math.max(1, totalSteps);
  const isContentPhase = currentStepIndex < contentSections.length;
  const currentContent = isContentPhase ? contentSections[currentStepIndex] : null;
  const currentQuizIndex = !isContentPhase ? currentStepIndex - contentSections.length : 0;
  const currentQuizQuestion = !isContentPhase ? quizQuestions[currentQuizIndex] : null;

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleCompleteModule();
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleQuizAnswer = (isCorrect, selectedIndex) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [currentQuizQuestion.id]: { isCorrect, selectedIndex },
    }));
  };

  const handleCompleteModule = async () => {
    const reward = moduleData.xpReward || 150;
    setEarnedXP(reward);
    await completeModule(moduleData.id, trackId, reward);
    setShowCelebration(true);
  };

  const handleCelebrationContinue = () => {
    setShowCelebration(false);
    // If next module exists in track, navigate to it or back to track detail
    const currentIndex = track?.modules?.findIndex((m) => m.id === moduleData.id) ?? -1;
    if (track && currentIndex >= 0 && currentIndex < track.modules.length - 1) {
      const nextMod = track.modules[currentIndex + 1];
      navigation.replace('Lesson', {
        moduleId: nextMod.id,
        trackId: track.id,
      });
    } else {
      navigation.goBack();
    }
  };

  const isCurrentQuizAnswered = currentQuizQuestion && !!quizAnswers[currentQuizQuestion.id];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { borderBottomColor: colors.borderLight }]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handlePrevStep}
          style={[styles.backBtn, { backgroundColor: colors.surfaceElevated }]}
        >
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.headerProgressCol}>
          <ProgressBar progress={progress} height={7} color={track?.color || colors.primary} />
          <Text style={[styles.stepCounter, { color: colors.textSecondary }]}>
            Step {currentStepIndex + 1} of {totalSteps}
          </Text>
        </View>

        <View
          style={[
            styles.xpBadge,
            { backgroundColor: colors.accentSoft },
          ]}
        >
          <Ionicons name="sparkles" size={13} color={colors.xp} />
          <Text style={[styles.xpBadgeText, { color: colors.xp, fontWeight: '700' }]}>
            +{moduleData.xpReward} XP
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Module Title Banner */}
        <View style={styles.moduleHeader}>
          <View style={styles.trackTagRow}>
            <View
              style={[
                styles.trackIndicator,
                { backgroundColor: track?.color || colors.primary },
              ]}
            />
            <Text style={[styles.trackTagName, { color: track?.color || colors.primary, fontWeight: '700' }]}>
              {track?.title || 'Skill Track'} • Sprint {moduleData.order}
            </Text>
          </View>

          <Text
            style={[
              styles.moduleTitle,
              {
                color: colors.text,
                fontSize: typography.fontSize.xxl,
                fontWeight: typography.fontWeight.heavy,
              },
            ]}
          >
            {moduleData.title}
          </Text>
        </View>

        {/* Phase 1: Conceptual Content Step */}
        {isContentPhase && currentContent && (
          <View style={styles.contentSection}>
            <View
              style={[
                styles.contentCard,
                {
                  backgroundColor: colors.surfaceCard,
                  borderColor: colors.border,
                  borderRadius: borderRadius.xl,
                  ...shadows.sm,
                },
              ]}
            >
              <Text
                style={[
                  styles.contentHeading,
                  {
                    color: colors.text,
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.bold,
                  },
                ]}
              >
                {currentContent.heading}
              </Text>

              <Text
                style={[
                  styles.contentBody,
                  { color: colors.text, fontSize: typography.fontSize.md },
                ]}
              >
                {currentContent.body}
              </Text>

              {/* Code Snippet Box */}
              {currentContent.codeSnippet && (
                <View
                  style={[
                    styles.codeBox,
                    {
                      backgroundColor: colors.surfaceElevated,
                      borderColor: colors.border,
                      borderRadius: borderRadius.lg,
                    },
                  ]}
                >
                  <View style={styles.codeHeader}>
                    <View style={styles.codeDotGroup}>
                      <View style={[styles.codeDot, { backgroundColor: '#EF4444' }]} />
                      <View style={[styles.codeDot, { backgroundColor: '#F59E0B' }]} />
                      <View style={[styles.codeDot, { backgroundColor: '#10B981' }]} />
                    </View>
                    <Text style={[styles.codeLang, { color: colors.textMuted }]}>Interactive Example</Text>
                  </View>
                  <Text style={[styles.codeText, { color: colors.text }]}>
                    {currentContent.codeSnippet}
                  </Text>
                </View>
              )}

              {/* Tip Box */}
              {currentContent.tip && (
                <View
                  style={[
                    styles.tipBox,
                    {
                      backgroundColor: colors.accentSoft,
                      borderColor: colors.accent,
                      borderRadius: borderRadius.md,
                    },
                  ]}
                >
                  <Ionicons name="bulb" size={18} color={colors.accentOrange} />
                  <Text style={[styles.tipText, { color: colors.text }]}>
                    <Text style={{ fontWeight: '700' }}>Pro Tip: </Text>
                    {currentContent.tip}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Phase 2: Interactive Quiz Step */}
        {!isContentPhase && currentQuizQuestion && (
          <View style={styles.quizSection}>
            <QuizQuestion
              questionData={currentQuizQuestion}
              questionNumber={currentQuizIndex + 1}
              totalQuestions={quizQuestions.length}
              onAnswer={handleQuizAnswer}
            />
          </View>
        )}
      </ScrollView>

      {/* Floating Bottom Navigation CTA */}
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
          disabled={!isContentPhase && !isCurrentQuizAnswered}
          activeOpacity={0.85}
          onPress={handleNextStep}
          style={[
            styles.actionButton,
            {
              backgroundColor:
                isContentPhase || isCurrentQuizAnswered
                  ? track?.color || colors.primary
                  : colors.border,
              borderRadius: borderRadius.full,
              opacity: isContentPhase || isCurrentQuizAnswered ? 1 : 0.6,
              ...(isContentPhase || isCurrentQuizAnswered
                ? shadows.glow(track?.color || colors.primary)
                : {}),
            },
          ]}
        >
          <Text style={styles.actionButtonText}>
            {currentStepIndex === totalSteps - 1
              ? 'Complete Module 🎉'
              : !isContentPhase
              ? 'Next Question'
              : 'Next Concept'}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Gamified Celebration Modal */}
      <CelebrationModal
        visible={showCelebration}
        onClose={() => setShowCelebration(false)}
        xpEarned={earnedXP}
        currentStreak={userStats.currentStreak || 1}
        moduleTitle={moduleData.title}
        onContinue={handleCelebrationContinue}
      />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerProgressCol: {
    flex: 1,
    marginHorizontal: 16,
    gap: 4,
  },
  stepCounter: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  xpBadgeText: {
    fontSize: 11,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 110,
    maxWidth: 580,
    alignSelf: 'center',
    width: '100%',
  },
  moduleHeader: {
    marginBottom: 20,
  },
  trackTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  trackIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  trackTagName: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  moduleTitle: {
    lineHeight: 30,
  },
  contentSection: {
    marginBottom: 16,
  },
  contentCard: {
    padding: 20,
    borderWidth: 1,
    gap: 16,
  },
  contentHeading: {},
  contentBody: {
    lineHeight: 24,
  },
  codeBox: {
    padding: 14,
    borderWidth: 1,
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  codeDotGroup: {
    flexDirection: 'row',
    gap: 5,
  },
  codeDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  codeLang: {
    fontSize: 11,
    fontWeight: '600',
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 20,
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 12,
    borderWidth: 1,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  quizSection: {
    marginBottom: 16,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
  },
  actionButton: {
    width: '100%',
    maxWidth: 540,
    alignSelf: 'center',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
