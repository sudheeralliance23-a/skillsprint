import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const ProfileScreen = ({ navigation }) => {
  const { isDark, toggleTheme, colors, typography, borderRadius, shadows } = useTheme();
  const { user, logout, updateUserProfile } = useAuth();
  const { userStats, completedModuleIds, resetProgress } = useData();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editName, setEditName] = useState(user?.name || 'Alex Chen');

  const handleSaveProfile = async () => {
    if (editName.trim()) {
      await updateUserProfile({ name: editName.trim() });
    }
    setEditModalVisible(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleReset = async () => {
    await resetProgress();
  };

  const displayName = user?.name || 'Alex Chen';
  const displayEmail = user?.email || 'alex.chen@skillsprint.dev';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.borderLight }]}>
        <Text
          style={[
            styles.headerTitle,
            {
              color: colors.text,
              fontSize: typography.fontSize.xxl,
              fontWeight: typography.fontWeight.heavy,
            },
          ]}
        >
          My Profile
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setEditName(displayName);
            setEditModalVisible(true);
          }}
          style={[styles.editButton, { backgroundColor: colors.surfaceElevated }]}
        >
          <Ionicons name="pencil" size={16} color={colors.primary} />
          <Text style={[styles.editButtonText, { color: colors.primary }]}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: colors.surfaceCard,
              borderColor: colors.border,
              borderRadius: borderRadius.xl,
              ...shadows.md,
            },
          ]}
        >
          <View style={styles.avatarSection}>
            <View
              style={[
                styles.avatarWrapper,
                {
                  backgroundColor: colors.primary,
                  borderColor: colors.primaryLight,
                  ...shadows.glow(colors.primary),
                },
              ]}
            >
              <Text style={styles.avatarInitials}>
                {displayName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)}
              </Text>
            </View>
            <View
              style={[
                styles.levelBadge,
                {
                  backgroundColor: colors.accent,
                  borderColor: colors.surface,
                },
              ]}
            >
              <Ionicons name="sparkles" size={12} color="#FFFFFF" />
              <Text style={styles.levelBadgeText}>Lv. 4</Text>
            </View>
          </View>

          <Text
            style={[
              styles.userName,
              {
                color: colors.text,
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.bold,
              },
            ]}
          >
            {displayName}
          </Text>

          <Text
            style={[
              styles.userEmail,
              { color: colors.textSecondary, fontSize: typography.fontSize.sm },
            ]}
          >
            {displayEmail}
          </Text>

          <View style={[styles.statsSummaryRow, { borderTopColor: colors.borderLight }]}>
            <View style={styles.summaryItem}>
              <Text
                style={[
                  styles.summaryVal,
                  { color: colors.xp, fontWeight: typography.fontWeight.heavy },
                ]}
              >
                {userStats.totalXP || 0}
              </Text>
              <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Total XP</Text>
            </View>

            <View style={[styles.summaryDivider, { backgroundColor: colors.borderLight }]} />

            <View style={styles.summaryItem}>
              <Text
                style={[
                  styles.summaryVal,
                  { color: colors.streak, fontWeight: typography.fontWeight.heavy },
                ]}
              >
                {userStats.currentStreak || 1} 🔥
              </Text>
              <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Day Streak</Text>
            </View>

            <View style={[styles.summaryDivider, { backgroundColor: colors.borderLight }]} />

            <View style={styles.summaryItem}>
              <Text
                style={[
                  styles.summaryVal,
                  { color: colors.success, fontWeight: typography.fontWeight.heavy },
                ]}
              >
                {completedModuleIds.length}
              </Text>
              <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Sprints</Text>
            </View>
          </View>
        </View>

        {/* Owner / Admin Portal Access */}
        <View style={styles.section}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('AdminDashboard')}
            style={[
              styles.adminPortalCard,
              {
                backgroundColor: isDark ? '#1E1B4B' : '#EEF2FF',
                borderColor: '#6366F1',
                borderRadius: borderRadius.xl,
              },
            ]}
          >
            <View style={styles.adminPortalLeft}>
              <View style={[styles.adminIconBox, { backgroundColor: '#4F46E5' }]}>
                <Ionicons name="shield-checkmark" size={22} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.adminHeaderRow}>
                  <Text style={[styles.adminPortalTitle, { color: isDark ? '#FFFFFF' : '#1E1B4B' }]}>
                    Owner & Admin Portal
                  </Text>
                  <View style={styles.adminTag}>
                    <Text style={styles.adminTagText}>OWNER</Text>
                  </View>
                </View>
                <Text style={[styles.adminPortalSub, { color: isDark ? '#C7D2FE' : '#4338CA' }]}>
                  View all active students, total XP, tracks & KPIs
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6366F1" />
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text,
                fontSize: typography.fontSize.md,
                fontWeight: typography.fontWeight.bold,
              },
            ]}
          >
            App Preferences & Theme
          </Text>

          <View
            style={[
              styles.cardGroup,
              {
                backgroundColor: colors.surfaceCard,
                borderColor: colors.border,
                borderRadius: borderRadius.xl,
              },
            ]}
          >
            {/* Dark Mode Toggle */}
            <View style={[styles.settingRow, { borderBottomColor: colors.borderLight }]}>
              <View style={styles.settingLabelGroup}>
                <View
                  style={[
                    styles.settingIcon,
                    { backgroundColor: isDark ? '#3B82F620' : '#F59E0B20' },
                  ]}
                >
                  <Ionicons
                    name={isDark ? 'moon' : 'sunny'}
                    size={20}
                    color={isDark ? '#60A5FA' : '#F59E0B'}
                  />
                </View>
                <View>
                  <Text style={[styles.settingTitle, { color: colors.text, fontWeight: '600' }]}>
                    Dark Mode
                  </Text>
                  <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                    {isDark ? 'Dark theme active' : 'Light theme active'}
                  </Text>
                </View>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* Daily Sprint Reminders */}
            <View style={[styles.settingRow, { borderBottomColor: colors.borderLight }]}>
              <View style={styles.settingLabelGroup}>
                <View style={[styles.settingIcon, { backgroundColor: colors.primarySoft }]}>
                  <Ionicons name="notifications-outline" size={20} color={colors.primary} />
                </View>
                <View>
                  <Text style={[styles.settingTitle, { color: colors.text, fontWeight: '600' }]}>
                    Daily Sprint Reminders
                  </Text>
                  <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                    Keep your streak alive with a 9 AM notification
                  </Text>
                </View>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* Sound & Celebration Haptics */}
            <View style={styles.settingRow}>
              <View style={styles.settingLabelGroup}>
                <View style={[styles.settingIcon, { backgroundColor: colors.accentSoft }]}>
                  <Ionicons name="volume-high-outline" size={20} color={colors.accentOrange} />
                </View>
                <View>
                  <Text style={[styles.settingTitle, { color: colors.text, fontWeight: '600' }]}>
                    Gamification Sound & Haptics
                  </Text>
                  <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                    Audio feedback during quiz checks
                  </Text>
                </View>
              </View>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Learning Actions */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text,
                fontSize: typography.fontSize.md,
                fontWeight: typography.fontWeight.bold,
              },
            ]}
          >
            Learning Path Tools
          </Text>

          <View
            style={[
              styles.cardGroup,
              {
                backgroundColor: colors.surfaceCard,
                borderColor: colors.border,
                borderRadius: borderRadius.xl,
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Assessment')}
              style={[styles.actionRow, { borderBottomColor: colors.borderLight }]}
            >
              <View style={styles.actionLabelGroup}>
                <View style={[styles.settingIcon, { backgroundColor: colors.primarySoft }]}>
                  <Ionicons name="sparkles" size={18} color={colors.primary} />
                </View>
                <View>
                  <Text style={[styles.actionTitle, { color: colors.text, fontWeight: '600' }]}>
                    Retake Skill Assessment
                  </Text>
                  <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>
                    Recalibrate your AI-recommended tracks
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleReset}
              style={styles.actionRow}
            >
              <View style={styles.actionLabelGroup}>
                <View style={[styles.settingIcon, { backgroundColor: colors.errorSoft }]}>
                  <Ionicons name="refresh" size={18} color={colors.error} />
                </View>
                <View>
                  <Text style={[styles.actionTitle, { color: colors.error, fontWeight: '600' }]}>
                    Reset Demo Progress
                  </Text>
                  <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>
                    Clear completed sprints for a fresh run
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleLogout}
          style={[
            styles.logoutButton,
            {
              backgroundColor: colors.surfaceCard,
              borderColor: colors.error,
              borderRadius: borderRadius.xl,
            },
          ]}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>Sign Out of SkillSprint</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={editModalVisible} transparent animationType="fade">
        <View style={[styles.modalBackdrop, { backgroundColor: colors.overlay }]}>
          <View
            style={[
              styles.editModalContent,
              {
                backgroundColor: colors.surfaceCard,
                borderRadius: borderRadius.xl,
                borderColor: colors.border,
                ...shadows.lg,
              },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                { color: colors.text, fontSize: typography.fontSize.lg, fontWeight: '700' },
              ]}
            >
              Edit Profile
            </Text>

            <View style={styles.editInputGroup}>
              <Text style={[styles.editInputLabel, { color: colors.textSecondary }]}>Full Name</Text>
              <TextInput
                style={[
                  styles.editTextInput,
                  {
                    backgroundColor: colors.surfaceElevated,
                    borderColor: colors.border,
                    color: colors.text,
                    borderRadius: borderRadius.md,
                  },
                ]}
                value={editName}
                onChangeText={setEditName}
                placeholder="Enter your name"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                style={[styles.modalBtn, { backgroundColor: colors.surfaceElevated }]}
              >
                <Text style={{ color: colors.textSecondary, fontWeight: '600' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSaveProfile}
                style={[styles.modalBtn, { backgroundColor: colors.primary }]}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  headerTitle: {
    letterSpacing: -0.5,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  profileCard: {
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 20,
  },
  avatarSection: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarWrapper: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -2,
    right: -4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 2,
  },
  levelBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  userName: {
    marginBottom: 2,
  },
  userEmail: {
    marginBottom: 16,
  },
  statsSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
  },
  summaryItem: {
    alignItems: 'center',
    gap: 2,
  },
  summaryVal: {
    fontSize: 17,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  summaryDivider: {
    width: 1,
    height: '100%',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  cardGroup: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  settingLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 10,
  },
  settingIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingTitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  actionLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  actionTitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderWidth: 1.5,
    marginTop: 4,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
  },
  modalBackdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  editModalContent: {
    width: '100%',
    maxWidth: 420,
    padding: 22,
    borderWidth: 1,
    gap: 16,
  },
  modalTitle: {},
  editInputGroup: {
    gap: 6,
  },
  editInputLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  editTextInput: {
    padding: 12,
    borderWidth: 1,
    fontSize: 15,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 8,
  },
  modalBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  adminPortalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1.5,
  },
  adminPortalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 10,
  },
  adminIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  adminPortalTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  adminTag: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  adminTagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  adminPortalSub: {
    fontSize: 12,
    fontWeight: '500',
  },
});
