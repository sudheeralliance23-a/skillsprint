import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export const QuizQuestion = ({
  questionData,
  questionNumber = 1,
  totalQuestions = 1,
  onAnswer,
}) => {
  const { colors, typography, borderRadius, shadows } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSelectOption = (index) => {
    if (hasSubmitted) return;
    setSelectedIndex(index);
  };

  const handleCheck = () => {
    if (selectedIndex === null) return;
    setHasSubmitted(true);
    const isCorrect = selectedIndex === questionData.correctIndex;
    if (onAnswer) {
      onAnswer(isCorrect, selectedIndex);
    }
  };

  const isAnswered = hasSubmitted;
  const isCorrect = isAnswered && selectedIndex === questionData.correctIndex;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surfaceCard,
          borderRadius: borderRadius.xl,
          borderColor: colors.border,
          ...shadows.md,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: colors.primarySoft }]}>
          <Text style={[styles.badgeText, { color: colors.primary }]}>
            Question {questionNumber} of {totalQuestions}
          </Text>
        </View>
        <Text style={[styles.xpHint, { color: colors.xp }]}>+50 XP</Text>
      </View>

      <Text
        style={[
          styles.questionTitle,
          {
            color: colors.text,
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.bold,
          },
        ]}
      >
        {questionData.question}
      </Text>

      <View style={styles.optionsList}>
        {questionData.options.map((option, index) => {
          const isThisSelected = selectedIndex === index;
          const isThisCorrect = index === questionData.correctIndex;

          let optionBg = colors.surfaceElevated;
          let optionBorder = colors.border;
          let textColor = colors.text;

          if (isAnswered) {
            if (isThisCorrect) {
              optionBg = colors.successSoft;
              optionBorder = colors.success;
              textColor = colors.success;
            } else if (isThisSelected && !isCorrect) {
              optionBg = colors.errorSoft;
              optionBorder = colors.error;
              textColor = colors.error;
            }
          } else if (isThisSelected) {
            optionBg = colors.primarySoft;
            optionBorder = colors.primary;
            textColor = colors.primary;
          }

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => handleSelectOption(index)}
              style={[
                styles.optionButton,
                {
                  backgroundColor: optionBg,
                  borderColor: optionBorder,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              <View
                style={[
                  styles.optionLetterBox,
                  {
                    backgroundColor: isThisSelected ? colors.primary : colors.surface,
                    borderColor: isThisSelected ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.optionLetter,
                    { color: isThisSelected ? '#FFFFFF' : colors.textSecondary },
                  ]}
                >
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>

              <Text
                style={[
                  styles.optionText,
                  {
                    color: textColor,
                    fontSize: typography.fontSize.sm,
                    fontWeight: isThisSelected ? '600' : '400',
                  },
                ]}
              >
                {option}
              </Text>

              {isAnswered && isThisCorrect && (
                <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              )}
              {isAnswered && isThisSelected && !isCorrect && (
                <Ionicons name="close-circle" size={20} color={colors.error} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {isAnswered && (
        <View
          style={[
            styles.feedbackBox,
            {
              backgroundColor: isCorrect ? colors.successSoft : colors.errorSoft,
              borderColor: isCorrect ? colors.success : colors.error,
              borderRadius: borderRadius.md,
            },
          ]}
        >
          <View style={styles.feedbackHeader}>
            <Ionicons
              name={isCorrect ? 'checkmark-circle' : 'information-circle'}
              size={18}
              color={isCorrect ? colors.success : colors.error}
            />
            <Text
              style={[
                styles.feedbackTitle,
                { color: isCorrect ? colors.success : colors.error },
              ]}
            >
              {isCorrect ? 'Awesome! That is correct' : 'Not quite right'}
            </Text>
          </View>
          <Text style={[styles.feedbackBody, { color: colors.textSecondary }]}>
            {questionData.explanation}
          </Text>
        </View>
      )}

      {!isAnswered && (
        <TouchableOpacity
          disabled={selectedIndex === null}
          activeOpacity={0.8}
          onPress={handleCheck}
          style={[
            styles.submitButton,
            {
              backgroundColor: selectedIndex !== null ? colors.primary : colors.border,
              borderRadius: borderRadius.full,
            },
          ]}
        >
          <Text style={styles.submitButtonText}>Check Answer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderWidth: 1,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  xpHint: {
    fontSize: 13,
    fontWeight: '700',
  },
  questionTitle: {
    lineHeight: 24,
    marginBottom: 18,
  },
  optionsList: {
    gap: 10,
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1.5,
  },
  optionLetterBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionLetter: {
    fontSize: 13,
    fontWeight: '700',
  },
  optionText: {
    flex: 1,
    lineHeight: 20,
  },
  feedbackBox: {
    padding: 14,
    borderWidth: 1,
    marginTop: 4,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  feedbackTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  feedbackBody: {
    fontSize: 13,
    lineHeight: 18,
  },
  submitButton: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
