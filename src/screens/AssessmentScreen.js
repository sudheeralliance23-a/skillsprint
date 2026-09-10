import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { ASSESSMENT_QUESTIONS } from '../data/seedData';
import { ProgressBar } from '../components/ProgressBar';

export const AssessmentScreen = ({ navigation }) => {
  const { colors, typography, borderRadius, shadows } = useTheme();
  const { saveAssessment } = useData();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const totalSteps = ASSESSMENT_QUESTIONS.length;
  const currentQuestion = ASSESSMENT_QUESTIONS[currentStep];
  const progress = (currentStep + 1) / totalSteps;

  const currentSelection = selectedAnswers[currentQuestion.id];

  const handleSelectOption = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleNext = async () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Final step -> Save assessment and navigate to results
      try {
        setSubmitting(true);
        const result = await saveAssessment(selectedAnswers);
        navigation.navigate('AssessmentResults', { result });
      } catch (err) {
        console.warn('Error saving assessment:', err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Header with Progress */}
      <View style={[styles.header, { borderBottomColor: colors.borderLight }]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBack}
          style={[styles.backButton, { backgroundColor: colors.surfaceElevated }]}
        >
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <ProgressBar progress={progress} height={8} color={colors.primary} />
          <Text style={[styles.stepLabel, { color: colors.textSecondary }]}>
            Step {currentStep + 1} of {totalSteps}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Login')}
          style={styles.skipButton}
        >
          <Text style={[styles.skipText, { color: colors.textMuted }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Question Title */}
        <View style={styles.questionHeader}>
          <View style={[styles.sparkleBadge, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="sparkles" size={14} color={colors.primary} />
            <Text style={[styles.sparkleText, { color: colors.primary }]}>AI Skill Diagnostic</Text>
          </View>

          <Text
            style={[
              styles.questionTitle,
              {
                color: colors.text,
                fontSize: typography.fontSize.xxl,
                fontWeight: typography.fontWeight.heavy,
              },
            ]}
          >
            {currentQuestion.title}
          </Text>

          <Text
            style={[
              styles.questionSubtitle,
              { color: colors.textSecondary, fontSize: typography.fontSize.sm },
            ]}
          >
            {currentQuestion.subtitle}
          </Text>
        </View>

        {/* Options List */}
        <View style={styles.optionsList}>
          {currentQuestion.options.map((option) => {
            const isSelected = currentSelection?.id === option.id;

            return (
              <TouchableOpacity
                key={option.id}
                activeOpacity={0.8}
                onPress={() => handleSelectOption(option)}
                style={[
                  styles.optionCard,
                  {
                    backgroundColor: isSelected ? colors.primarySoft : colors.surfaceCard,
                    borderColor: isSelected ? colors.primary : colors.border,
                    borderWidth: isSelected ? 2 : 1,
                    borderRadius: borderRadius.xl,
                    ...(isSelected ? shadows.md : shadows.sm),
                  },
                ]}
              >
                {option.icon && (
                  <View
                    style={[
                      styles.optionIconBox,
                      {
                        backgroundColor: isSelected ? colors.primary : colors.surfaceElevated,
                      },
                    ]}
                  >
                    <Ionicons
                      name={option.icon}
                      size={22}
                      color={isSelected ? '#FFFFFF' : colors.primary}
                    />
                  </View>
                )}

                <View style={styles.optionTextContainer}>
                  <Text
                    style={[
                      styles.optionLabel,
                      {
                        color: isSelected ? colors.primary : colors.text,
                        fontSize: typography.fontSize.md,
                        fontWeight: isSelected ? '700' : '500',
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                </View>

                <View
                  style={[
                    styles.radioCircle,
                    {
                      borderColor: isSelected ? colors.primary : colors.border,
                      backgroundColor: isSelected ? colors.primary : 'transparent',
                    },
                  ]}
                >
                  {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom CTA Bar */}
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
          disabled={!currentSelection || submitting}
          activeOpacity={0.85}
          onPress={handleNext}
          style={[
            styles.nextButton,
            {
              backgroundColor: currentSelection ? colors.primary : colors.border,
              borderRadius: borderRadius.full,
              opacity: currentSelection ? 1 : 0.6,
              ...(currentSelection ? shadows.glow(colors.primary) : {}),
            },
          ]}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === totalSteps - 1
              ? submitting
                ? 'Personalizing Roadmap...'
                : 'Generate My Path'
              : 'Continue'}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 16,
    gap: 6,
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  skipButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  skipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
    maxWidth: 540,
    alignSelf: 'center',
    width: '100%',
  },
  questionHeader: {
    marginBottom: 24,
  },
  sparkleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    marginBottom: 12,
  },
  sparkleText: {
    fontSize: 11,
    fontWeight: '700',
  },
  questionTitle: {
    lineHeight: 30,
    marginBottom: 8,
  },
  questionSubtitle: {
    lineHeight: 20,
  },
  optionsList: {
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },
  optionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    lineHeight: 22,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
  },
  nextButton: {
    width: '100%',
    maxWidth: 540,
    alignSelf: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
