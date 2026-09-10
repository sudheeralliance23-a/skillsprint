import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { StreakFlame } from './StreakFlame';

export const CelebrationModal = ({
  visible,
  onClose,
  xpEarned = 150,
  currentStreak = 1,
  moduleTitle = 'Sprint Complete',
  onContinue,
}) => {
  const { colors, typography, borderRadius, shadows } = useTheme();
  const [scaleAnim] = useState(new Animated.Value(0.7));
  const [opacityAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.7);
      opacityAnim.setValue(0);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[styles.backdrop, { backgroundColor: colors.overlay }]}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              backgroundColor: colors.surfaceCard,
              borderRadius: borderRadius.xxl,
              borderColor: colors.border,
              ...shadows.lg,
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Celebratory Badge */}
          <View style={[styles.trophyWrapper, { backgroundColor: colors.accentSoft }]}>
            <Ionicons name="trophy" size={54} color={colors.accent} />
          </View>

          <Text
            style={[
              styles.celebrateTitle,
              {
                color: colors.text,
                fontSize: typography.fontSize.xxl,
                fontWeight: typography.fontWeight.heavy,
              },
            ]}
          >
            Sprint Completed!
          </Text>

          <Text
            numberOfLines={2}
            style={[
              styles.moduleName,
              { color: colors.textSecondary, fontSize: typography.fontSize.sm },
            ]}
          >
            {moduleTitle}
          </Text>

          {/* Reward cards */}
          <View style={styles.rewardsRow}>
            <View
              style={[
                styles.rewardCard,
                {
                  backgroundColor: colors.surfaceElevated,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              <Ionicons name="sparkles" size={24} color={colors.xp} />
              <Text
                style={[
                  styles.rewardValue,
                  { color: colors.xp, fontWeight: typography.fontWeight.heavy },
                ]}
              >
                +{xpEarned}
              </Text>
              <Text style={[styles.rewardLabel, { color: colors.textMuted }]}>XP Gained</Text>
            </View>

            <View
              style={[
                styles.rewardCard,
                {
                  backgroundColor: colors.surfaceElevated,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
            >
              <Ionicons name="flame" size={26} color={colors.streak} />
              <Text
                style={[
                  styles.rewardValue,
                  { color: colors.streak, fontWeight: typography.fontWeight.heavy },
                ]}
              >
                {currentStreak} Days
              </Text>
              <Text style={[styles.rewardLabel, { color: colors.textMuted }]}>Streak Active</Text>
            </View>
          </View>

          {/* Motivational Quote */}
          <View
            style={[
              styles.quoteBox,
              {
                backgroundColor: colors.primarySoft,
                borderRadius: borderRadius.md,
              },
            ]}
          >
            <Ionicons name="bulb-outline" size={16} color={colors.primary} />
            <Text style={[styles.quoteText, { color: colors.primary }]}>
              "Small daily sprints lead to massive yearly transformations."
            </Text>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              if (onContinue) onContinue();
              else onClose();
            }}
            style={[
              styles.continueButton,
              {
                backgroundColor: colors.primary,
                borderRadius: borderRadius.full,
                ...shadows.glow(colors.primary),
              },
            ]}
          >
            <Text style={styles.continueButtonText}>Claim Rewards & Continue</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
  },
  trophyWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10,
    marginBottom: 16,
  },
  celebrateTitle: {
    textAlign: 'center',
    marginBottom: 4,
  },
  moduleName: {
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  rewardsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 16,
  },
  rewardCard: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    gap: 4,
  },
  rewardValue: {
    fontSize: 18,
  },
  rewardLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  quoteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    width: '100%',
    marginBottom: 20,
  },
  quoteText: {
    flex: 1,
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  continueButton: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
