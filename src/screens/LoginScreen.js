import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const LoginScreen = ({ navigation }) => {
  const { colors, typography, borderRadius, shadows } = useTheme();
  const { login, loginWithGoogle, loginAsDemo, error, loading, clearError } = useAuth();

  const [email, setEmail] = useState('alex.chen@skillsprint.dev');
  const [password, setPassword] = useState('SprintPass123!');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleLogin = async () => {
    clearError();
    setLocalError('');
    if (!email.trim()) {
      setLocalError('Please enter your email address');
      return;
    }
    if (!password) {
      setLocalError('Please enter your password');
      return;
    }
    try {
      await login(email, password);
    } catch (err) {
      // Handled in AuthContext
    }
  };

  const handleGoogleLogin = async () => {
    clearError();
    setLocalError('');
    try {
      await loginWithGoogle();
    } catch (err) {
      // Handled in AuthContext
    }
  };

  const activeError = localError || error;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={[styles.backButton, { backgroundColor: colors.surfaceElevated }]}
          >
            <Ionicons name="arrow-back" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentSection}>
          <View style={[styles.iconBadge, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="log-in-outline" size={28} color={colors.primary} />
          </View>

          <Text
            style={[
              styles.title,
              {
                color: colors.text,
                fontSize: typography.fontSize.xxxl,
                fontWeight: typography.fontWeight.heavy,
              },
            ]}
          >
            Welcome Back
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: colors.textSecondary, fontSize: typography.fontSize.sm },
            ]}
          >
            Log in to continue your daily streak and sprint modules
          </Text>

          {/* Error Banner */}
          {activeError ? (
            <View
              style={[
                styles.errorBanner,
                {
                  backgroundColor: colors.errorSoft,
                  borderColor: colors.error,
                  borderRadius: borderRadius.md,
                },
              ]}
            >
              <Ionicons name="alert-circle" size={18} color={colors.error} />
              <Text style={[styles.errorText, { color: colors.error }]}>{activeError}</Text>
            </View>
          ) : null}

          {/* Form Fields */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Email Address</Text>
              <View
                style={[
                  styles.inputContainer,
                  {
                    backgroundColor: colors.surfaceCard,
                    borderColor: colors.border,
                    borderRadius: borderRadius.lg,
                  },
                ]}
              >
                <Ionicons name="mail-outline" size={20} color={colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, { color: colors.text }]}
                  placeholder="student@university.edu"
                  placeholderTextColor={colors.textMuted}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (activeError) clearError();
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Password</Text>
              <View
                style={[
                  styles.inputContainer,
                  {
                    backgroundColor: colors.surfaceCard,
                    borderColor: colors.border,
                    borderRadius: borderRadius.lg,
                  },
                ]}
              >
                <Ionicons name="lock-closed-outline" size={20} color={colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, { color: colors.text }]}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textMuted}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (activeError) clearError();
                  }}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              disabled={loading}
              activeOpacity={0.85}
              onPress={handleLogin}
              style={[
                styles.primaryButton,
                {
                  backgroundColor: colors.primary,
                  borderRadius: borderRadius.full,
                  ...shadows.glow(colors.primary),
                },
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.primaryButtonText}>Log In</Text>
                  <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                </>
              )}
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              <Text style={[styles.dividerText, { color: colors.textMuted }]}>OR CONTINUE WITH</Text>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            </View>

            {/* Google Sign In */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleGoogleLogin}
              style={[
                styles.googleButton,
                {
                  backgroundColor: colors.surfaceCard,
                  borderColor: colors.border,
                  borderRadius: borderRadius.full,
                  ...shadows.sm,
                },
              ]}
            >
              <Ionicons name="logo-google" size={18} color="#EA4335" />
              <Text style={[styles.googleButtonText, { color: colors.text }]}>
                Sign In with Google
              </Text>
            </TouchableOpacity>

            {/* Quick Demo Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={loginAsDemo}
              style={[
                styles.demoButton,
                {
                  backgroundColor: colors.accentSoft,
                  borderColor: colors.accentOrange,
                  borderRadius: borderRadius.full,
                },
              ]}
            >
              <Ionicons name="flash" size={16} color={colors.accentOrange} />
              <Text style={[styles.demoButtonText, { color: colors.accentOrange }]}>
                Quick Demo Sign-In (Alex Chen)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Link */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={[styles.footerLink, { color: colors.primary, fontWeight: '700' }]}>
                Sign Up
              </Text>
            </TouchableOpacity>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 10,
    maxWidth: 480,
    alignSelf: 'center',
    width: '100%',
  },
  contentSection: {
    alignItems: 'center',
  },
  iconBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderWidth: 1,
    width: '100%',
    marginBottom: 18,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
  },
  form: {
    width: '100%',
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
  },
  eyeIcon: {
    padding: 6,
  },
  primaryButton: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 12,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderWidth: 1,
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  demoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderWidth: 1,
  },
  demoButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
  },
});
