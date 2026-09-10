export const lightColors = {
  primary: '#4F46E5', // Electric violet
  primaryLight: '#818CF8',
  primaryDark: '#3730A3',
  primarySoft: '#EEF2FF',
  
  accent: '#F59E0B', // Warm amber
  accentOrange: '#F97316',
  accentSoft: '#FEF3C7',
  
  success: '#10B981',
  successSoft: '#D1FAE5',
  
  error: '#EF4444',
  errorSoft: '#FEE2E2',
  
  warning: '#F59E0B',
  info: '#0284C7',
  infoSoft: '#E0F2FE',
  
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceCard: '#FFFFFF',
  surfaceElevated: '#F1F5F9',
  
  text: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',
  
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  borderFocus: '#4F46E5',
  
  streak: '#F97316',
  xp: '#F59E0B',
  badgeGold: '#FBBF24',
  badgeSilver: '#94A3B8',
  badgeBronze: '#D97706',
  
  shadow: 'rgba(15, 23, 42, 0.08)',
  overlay: 'rgba(15, 23, 42, 0.5)',
};

export const darkColors = {
  primary: '#6366F1', // Brighter violet for dark mode
  primaryLight: '#A5B4FC',
  primaryDark: '#4F46E5',
  primarySoft: '#312E81',
  
  accent: '#FBBF24', // Brighter amber
  accentOrange: '#FB923C',
  accentSoft: '#78350F',
  
  success: '#34D399',
  successSoft: '#064E3B',
  
  error: '#F87171',
  errorSoft: '#7F1D1D',
  
  warning: '#FBBF24',
  info: '#38BDF8',
  infoSoft: '#0C4A6E',
  
  background: '#0B0F19',
  surface: '#111827',
  surfaceCard: '#1E293B',
  surfaceElevated: '#334155',
  
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textInverse: '#0F172A',
  
  border: '#334155',
  borderLight: '#1E293B',
  borderFocus: '#6366F1',
  
  streak: '#FB923C',
  xp: '#FBBF24',
  badgeGold: '#FDE047',
  badgeSilver: '#CBD5E1',
  badgeBronze: '#F59E0B',
  
  shadow: 'rgba(0, 0, 0, 0.4)',
  overlay: 'rgba(0, 0, 0, 0.75)',
};

export const typography = {
  fontFamilyHeading: 'System',
  fontFamilyBody: 'System',
  
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
    display: 36,
  },
  
  fontWeight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    heavy: '800',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  giant: 40,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 8,
  },
  glow: (color) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  }),
};
