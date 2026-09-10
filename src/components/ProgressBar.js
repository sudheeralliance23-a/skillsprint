import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const ProgressBar = ({
  progress = 0, // 0 to 1
  height = 8,
  color,
  backgroundColor,
  showLabel = false,
  animated = true,
}) => {
  const { colors, borderRadius, typography } = useTheme();

  const clampedProgress = Math.max(0, Math.min(1, progress));
  const percentage = Math.round(clampedProgress * 100);
  const barColor = color || colors.primary;
  const barBg = backgroundColor || colors.borderLight || colors.surfaceElevated;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.track,
          {
            height,
            backgroundColor: barBg,
            borderRadius: height / 2,
          },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${percentage}%`,
              backgroundColor: barColor,
              borderRadius: height / 2,
            },
          ]}
        />
      </View>
      {showLabel && (
        <Text style={[styles.label, { color: colors.textSecondary, fontSize: typography.fontSize.xs }]}>
          {percentage}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
  label: {
    marginTop: 4,
    fontWeight: '600',
    textAlign: 'right',
  },
});
