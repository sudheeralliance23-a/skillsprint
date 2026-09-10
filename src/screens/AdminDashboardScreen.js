import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import {
  PLATFORM_METRICS,
  INITIAL_STUDENTS,
  TRACK_PERFORMANCE,
  LIVE_ACTIVITY_FEED,
} from '../data/adminData';

export default function AdminDashboardScreen({ navigation }) {
  const { colors, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'students' | 'tracks' | 'activity'
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('All'); // 'All' | 'Pro' | 'Free' | 'Active'
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [bonusModalVisible, setBonusModalVisible] = useState(false);
  const [bonusAmount, setBonusAmount] = useState('100');
  const [announcementModalVisible, setAnnouncementModalVisible] = useState(false);
  const [announcementText, setAnnouncementText] = useState('');
  const [broadcastAlert, setBroadcastAlert] = useState(null);

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.enrolledTracks.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (tierFilter === 'Pro') return s.tier === 'Pro';
    if (tierFilter === 'Free') return s.tier === 'Free';
    if (tierFilter === 'Active') return s.status === 'Active';
    return true;
  });

  const handleAwardBonusXP = () => {
    if (!selectedStudent) return;
    const amount = parseInt(bonusAmount, 10) || 100;
    setStudents((prev) =>
      prev.map((s) => (s.id === selectedStudent.id ? { ...s, totalXP: s.totalXP + amount } : s))
    );
    setBonusModalVisible(false);
    if (Platform.OS === 'web') {
      window.alert(`🎉 Awarded +${amount} XP to ${selectedStudent.name} (${selectedStudent.email})!`);
    } else {
      Alert.alert('XP Awarded', `Successfully granted +${amount} XP to ${selectedStudent.name}!`);
    }
  };

  const handleSendBroadcast = () => {
    if (!announcementText.trim()) return;
    const message = announcementText.trim();
    setBroadcastAlert(message);
    setAnnouncementText('');
    setAnnouncementModalVisible(false);
    if (Platform.OS === 'web') {
      window.alert(`📢 Broadcast sent to all ${PLATFORM_METRICS.totalStudents} students: "${message}"`);
    } else {
      Alert.alert('Announcement Sent', 'Broadcast successfully sent to all enrolled students.');
    }
  };

  const handleExportCSV = () => {
    const headers = 'ID,Name,Email,Tier,TotalXP,Streak,Level,CompletedModules,Status,JoinedDate\n';
    const rows = students
      .map(
        (s) =>
          `${s.id},"${s.name}","${s.email}",${s.tier},${s.totalXP},${s.streak},${s.level},${s.completedModules},${s.status},${s.joinedDate}`
      )
      .join('\n');
    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(headers + rows);

    if (Platform.OS === 'web') {
      const link = document.createElement('a');
      link.setAttribute('href', csvContent);
      link.setAttribute('download', `skillsprint_students_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      Alert.alert('Export Ready', 'Student data formatted as CSV.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerLeft}>
          <View style={styles.ownerBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#FFF" />
            <Text style={styles.ownerBadgeText}>OWNER PORTAL</Text>
          </View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>SkillSprint Admin</Text>
        </View>

        <TouchableOpacity
          style={[styles.exitButton, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '40' }]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={16} color={colors.primary} />
          <Text style={[styles.exitButtonText, { color: colors.primary }]}>Student View</Text>
        </TouchableOpacity>
      </View>

      {/* Broadcast Alert Banner if sent */}
      {broadcastAlert && (
        <View style={styles.alertBanner}>
          <Ionicons name="megaphone" size={18} color="#FFF" />
          <Text style={styles.alertBannerText} numberOfLines={2}>
            Live Broadcast: "{broadcastAlert}"
          </Text>
          <TouchableOpacity onPress={() => setBroadcastAlert(null)}>
            <Ionicons name="close-circle" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}

      {/* Navigation Tabs */}
      <View style={[styles.tabBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'overview' && { borderBottomColor: colors.primary, borderBottomWidth: 3 }]}
          onPress={() => setActiveTab('overview')}
        >
          <Ionicons name="bar-chart" size={16} color={activeTab === 'overview' ? colors.primary : colors.textMuted} />
          <Text style={[styles.tabText, { color: activeTab === 'overview' ? colors.primary : colors.textMuted }]}>
            Overview
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'students' && { borderBottomColor: colors.primary, borderBottomWidth: 3 }]}
          onPress={() => setActiveTab('students')}
        >
          <Ionicons name="people" size={16} color={activeTab === 'students' ? colors.primary : colors.textMuted} />
          <Text style={[styles.tabText, { color: activeTab === 'students' ? colors.primary : colors.textMuted }]}>
            Students ({students.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'tracks' && { borderBottomColor: colors.primary, borderBottomWidth: 3 }]}
          onPress={() => setActiveTab('tracks')}
        >
          <Ionicons name="layers" size={16} color={activeTab === 'tracks' ? colors.primary : colors.textMuted} />
          <Text style={[styles.tabText, { color: activeTab === 'tracks' ? colors.primary : colors.textMuted }]}>
            Tracks (6)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'activity' && { borderBottomColor: colors.primary, borderBottomWidth: 3 }]}
          onPress={() => setActiveTab('activity')}
        >
          <Ionicons name="pulse" size={16} color={activeTab === 'activity' ? colors.primary : colors.textMuted} />
          <Text style={[styles.tabText, { color: activeTab === 'activity' ? colors.primary : colors.textMuted }]}>
            Live Feed
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ==================================================== */}
        {/* TAB 1: OVERVIEW METRICS */}
        {/* ==================================================== */}
        {activeTab === 'overview' && (
          <View>
            <View style={styles.sectionHeaderRow}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Platform Key Performance (KPIs)</Text>
              <Text style={[styles.growthBadge, { backgroundColor: '#10B98120', color: '#10B981' }]}>
                {PLATFORM_METRICS.growthRate}
              </Text>
            </View>

            {/* KPI Cards Grid */}
            <View style={styles.kpiGrid}>
              <View style={[styles.kpiCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={[styles.kpiIconBox, { backgroundColor: '#4F46E518' }]}>
                  <Ionicons name="people" size={20} color="#4F46E5" />
                </View>
                <Text style={[styles.kpiValue, { color: colors.text }]}>
                  {PLATFORM_METRICS.totalStudents.toLocaleString()}
                </Text>
                <Text style={[styles.kpiLabel, { color: colors.textMuted }]}>Total Registered Students</Text>
                <Text style={[styles.kpiSub, { color: '#10B981' }]}>+{PLATFORM_METRICS.activeToday} active today</Text>
              </View>

              <View style={[styles.kpiCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={[styles.kpiIconBox, { backgroundColor: '#F59E0B18' }]}>
                  <Ionicons name="flash" size={20} color="#F59E0B" />
                </View>
                <Text style={[styles.kpiValue, { color: colors.text }]}>
                  {PLATFORM_METRICS.totalSprintsCompleted.toLocaleString()}
                </Text>
                <Text style={[styles.kpiLabel, { color: colors.textMuted }]}>Sprints Completed</Text>
                <Text style={[styles.kpiSub, { color: colors.primary }]}>{PLATFORM_METRICS.averageCompletionRate}% avg rate</Text>
              </View>

              <View style={[styles.kpiCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={[styles.kpiIconBox, { backgroundColor: '#EC489918' }]}>
                  <Ionicons name="sparkles" size={20} color="#EC4899" />
                </View>
                <Text style={[styles.kpiValue, { color: colors.text }]}>
                  {(PLATFORM_METRICS.totalXPAwarded / 1000).toFixed(1)}k
                </Text>
                <Text style={[styles.kpiLabel, { color: colors.textMuted }]}>Total XP Distributed</Text>
                <Text style={[styles.kpiSub, { color: '#EC4899' }]}>Gamification Health: 99%</Text>
              </View>

              <View style={[styles.kpiCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={[styles.kpiIconBox, { backgroundColor: '#10B98118' }]}>
                  <Ionicons name="card" size={20} color="#10B981" />
                </View>
                <Text style={[styles.kpiValue, { color: colors.text }]}>{PLATFORM_METRICS.monthlyRevenue}</Text>
                <Text style={[styles.kpiLabel, { color: colors.textMuted }]}>Monthly Pro Revenue</Text>
                <Text style={[styles.kpiSub, { color: '#10B981' }]}>{PLATFORM_METRICS.proSubscribers} Pro members</Text>
              </View>
            </View>

            {/* Quick Owner Actions */}
            <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24, marginBottom: 12 }]}>
              Owner Actions & Controls
            </Text>
            <View style={styles.actionButtonRow}>
              <TouchableOpacity
                style={[styles.primaryActionBtn, { backgroundColor: colors.primary }]}
                onPress={() => setAnnouncementModalVisible(true)}
                activeOpacity={0.8}
              >
                <Ionicons name="megaphone" size={18} color="#FFF" />
                <Text style={styles.actionBtnText}>Broadcast Announcement</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.secondaryActionBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={handleExportCSV}
                activeOpacity={0.8}
              >
                <Ionicons name="download-outline" size={18} color={colors.text} />
                <Text style={[styles.secondaryActionText, { color: colors.text }]}>Export CSV Roster</Text>
              </TouchableOpacity>
            </View>

            {/* Track Popularity Ranking */}
            <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24, marginBottom: 12 }]}>
              Track Popularity & Engagement
            </Text>
            <View style={[styles.trackListCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {TRACK_PERFORMANCE.map((t, idx) => (
                <View
                  key={t.id}
                  style={[
                    styles.trackPerformanceRow,
                    idx < TRACK_PERFORMANCE.length - 1 && { borderBottomColor: colors.border, borderBottomWidth: 1 },
                  ]}
                >
                  <View style={[styles.trackRankCircle, { backgroundColor: t.color + '20' }]}>
                    <Text style={[styles.trackRankText, { color: t.color }]}>#{idx + 1}</Text>
                  </View>
                  <View style={styles.trackInfo}>
                    <Text style={[styles.trackName, { color: colors.text }]}>{t.title}</Text>
                    <Text style={[styles.trackCat, { color: colors.textMuted }]}>
                      {t.category} • {t.enrolledCount} students
                    </Text>
                  </View>
                  <View style={styles.trackRateBox}>
                    <Text style={[styles.trackRateVal, { color: '#10B981' }]}>{t.completionRate}%</Text>
                    <Text style={[styles.trackRateSub, { color: colors.textMuted }]}>completion</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ==================================================== */}
        {/* TAB 2: STUDENTS ROSTER */}
        {/* ==================================================== */}
        {activeTab === 'students' && (
          <View>
            {/* Search and Filters */}
            <View style={[styles.searchBarBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="search" size={18} color={colors.textMuted} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search students by name, email, or track..."
                placeholderTextColor={colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                </TouchableOpacity>
              )}
            </View>

            {/* Filter Chips */}
            <View style={styles.filterChipRow}>
              {['All', 'Pro', 'Free', 'Active'].map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[
                    styles.filterChip,
                    tierFilter === f
                      ? { backgroundColor: colors.primary, borderColor: colors.primary }
                      : { backgroundColor: colors.card, borderColor: colors.border },
                  ]}
                  onPress={() => setTierFilter(f)}
                >
                  <Text style={[styles.filterChipText, { color: tierFilter === f ? '#FFF' : colors.text }]}>{f}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Student Cards List */}
            <Text style={[styles.rosterCountText, { color: colors.textMuted }]}>
              Showing {filteredStudents.length} of {students.length} student members
            </Text>

            {filteredStudents.map((st) => (
              <View
                key={st.id}
                style={[styles.studentCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <View style={styles.studentCardHeader}>
                  <View style={[styles.studentAvatar, { backgroundColor: st.avatarColor }]}>
                    <Text style={styles.studentAvatarText}>{st.avatar}</Text>
                  </View>
                  <View style={styles.studentDetails}>
                    <View style={styles.studentNameRow}>
                      <Text style={[styles.studentName, { color: colors.text }]}>{st.name}</Text>
                      <View
                        style={[
                          styles.tierBadge,
                          st.tier === 'Pro'
                            ? { backgroundColor: '#8B5CF620', borderColor: '#8B5CF6' }
                            : { backgroundColor: colors.border, borderColor: colors.border },
                        ]}
                      >
                        <Text style={[styles.tierBadgeText, { color: st.tier === 'Pro' ? '#8B5CF6' : colors.textMuted }]}>
                          {st.tier}
                        </Text>
                      </View>
                    </View>
                    <Text style={[styles.studentEmail, { color: colors.textMuted }]}>{st.email}</Text>
                  </View>
                </View>

                {/* Metrics Stats Row */}
                <View style={[styles.studentMetricsRow, { backgroundColor: isDark ? '#1F2937' : '#F9FAFB' }]}>
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricItemVal, { color: colors.text }]}>✨ {st.totalXP} XP</Text>
                    <Text style={[styles.metricItemLbl, { color: colors.textMuted }]}>Total XP</Text>
                  </View>
                  <View style={styles.metricDivider} />
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricItemVal, { color: '#F59E0B' }]}>🔥 {st.streak} Days</Text>
                    <Text style={[styles.metricItemLbl, { color: colors.textMuted }]}>Current Streak</Text>
                  </View>
                  <View style={styles.metricDivider} />
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricItemVal, { color: colors.text }]}>Level {st.level}</Text>
                    <Text style={[styles.metricItemLbl, { color: colors.textMuted }]}>Sprints ({st.completedModules})</Text>
                  </View>
                </View>

                {/* Enrolled Tracks Chips */}
                <View style={styles.enrolledTracksBox}>
                  <Text style={[styles.enrolledLabel, { color: colors.textMuted }]}>Enrolled Tracks:</Text>
                  <View style={styles.enrolledTracksWrap}>
                    {st.enrolledTracks.map((trk, i) => (
                      <View key={i} style={[styles.trackMiniChip, { backgroundColor: colors.primary + '15' }]}>
                        <Text style={[styles.trackMiniChipText, { color: colors.primary }]}>{trk}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Card Actions */}
                <View style={[styles.studentCardActions, { borderTopColor: colors.border }]}>
                  <Text style={[styles.lastActiveText, { color: colors.textMuted }]}>Active: {st.lastActive}</Text>
                  <TouchableOpacity
                    style={[styles.grantXPBtn, { backgroundColor: colors.primary }]}
                    onPress={() => {
                      setSelectedStudent(st);
                      setBonusModalVisible(true);
                    }}
                  >
                    <Ionicons name="gift-outline" size={14} color="#FFF" />
                    <Text style={styles.grantXPText}>Grant Bonus XP</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ==================================================== */}
        {/* TAB 3: TRACK ANALYTICS */}
        {/* ==================================================== */}
        {activeTab === 'tracks' && (
          <View>
            <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 12 }]}>
              Curriculum & Track Health
            </Text>

            {TRACK_PERFORMANCE.map((trk) => (
              <View
                key={trk.id}
                style={[styles.trackDetailCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <View style={styles.trackDetailHeader}>
                  <View style={[styles.trackIconWrap, { backgroundColor: trk.color + '20' }]}>
                    <Ionicons name="school" size={20} color={trk.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.trackDetailTitle, { color: colors.text }]}>{trk.title}</Text>
                    <Text style={[styles.trackDetailCat, { color: colors.textMuted }]}>{trk.category}</Text>
                  </View>
                  <View style={[styles.accuracyBadge, { backgroundColor: '#10B98120' }]}>
                    <Text style={[styles.accuracyText, { color: '#10B981' }]}>{trk.avgQuizScore} Quiz Avg</Text>
                  </View>
                </View>

                <View style={styles.progressStatsRow}>
                  <View style={styles.progressStatCol}>
                    <Text style={[styles.progressStatVal, { color: colors.text }]}>{trk.enrolledCount}</Text>
                    <Text style={[styles.progressStatLbl, { color: colors.textMuted }]}>Enrolled Students</Text>
                  </View>
                  <View style={styles.progressStatCol}>
                    <Text style={[styles.progressStatVal, { color: '#10B981' }]}>{trk.completionRate}%</Text>
                    <Text style={[styles.progressStatLbl, { color: colors.textMuted }]}>Completion Rate</Text>
                  </View>
                  <View style={styles.progressStatCol}>
                    <Text style={[styles.progressStatVal, { color: colors.primary }]}>Active</Text>
                    <Text style={[styles.progressStatLbl, { color: colors.textMuted }]}>Status</Text>
                  </View>
                </View>

                {/* Progress bar */}
                <View style={[styles.trackProgressBarBg, { backgroundColor: isDark ? '#374151' : '#E5E7EB' }]}>
                  <View style={[styles.trackProgressBarFill, { width: `${trk.completionRate}%`, backgroundColor: trk.color }]} />
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ==================================================== */}
        {/* TAB 4: LIVE ACTIVITY FEED */}
        {/* ==================================================== */}
        {activeTab === 'activity' && (
          <View>
            <View style={styles.sectionHeaderRow}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Real-Time Student Activity</Text>
              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE STREAM</Text>
              </View>
            </View>

            <View style={[styles.activityFeedCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {LIVE_ACTIVITY_FEED.map((act, i) => (
                <View
                  key={act.id}
                  style={[
                    styles.activityItem,
                    i < LIVE_ACTIVITY_FEED.length - 1 && { borderBottomColor: colors.border, borderBottomWidth: 1 },
                  ]}
                >
                  <View style={[styles.activityAvatar, { backgroundColor: act.color }]}>
                    <Text style={styles.activityAvatarText}>{act.avatar}</Text>
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={[styles.activityUser, { color: colors.text }]}>{act.user}</Text>
                    <Text style={[styles.activityAction, { color: colors.textMuted }]}>{act.action}</Text>
                    <Text style={[styles.activityTrack, { color: colors.primary }]}>{act.track}</Text>
                  </View>
                  <View style={styles.activityRight}>
                    <Text style={[styles.activityXP, { color: '#F59E0B' }]}>{act.xp}</Text>
                    <Text style={[styles.activityTime, { color: colors.textMuted }]}>{act.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Grant Bonus XP Modal */}
      <Modal visible={bonusModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="sparkles" size={32} color="#F59E0B" style={{ alignSelf: 'center', marginBottom: 12 }} />
            <Text style={[styles.modalTitle, { color: colors.text }]}>Award Bonus XP</Text>
            <Text style={[styles.modalSub, { color: colors.textMuted }]}>
              Grant XP reward to {selectedStudent?.name} ({selectedStudent?.email})
            </Text>

            <TextInput
              style={[styles.modalInput, { backgroundColor: isDark ? '#1F2937' : '#F3F4F6', color: colors.text, borderColor: colors.border }]}
              placeholder="XP Amount (e.g. 100)"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              value={bonusAmount}
              onChangeText={setBonusAmount}
            />

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={[styles.modalCancelBtn, { borderColor: colors.border }]}
                onPress={() => setBonusModalVisible(false)}
              >
                <Text style={[styles.modalCancelText, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalConfirmBtn, { backgroundColor: colors.primary }]}
                onPress={handleAwardBonusXP}
              >
                <Text style={styles.modalConfirmText}>Grant XP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Broadcast Announcement Modal */}
      <Modal visible={announcementModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="megaphone" size={32} color={colors.primary} style={{ alignSelf: 'center', marginBottom: 12 }} />
            <Text style={[styles.modalTitle, { color: colors.text }]}>Broadcast Announcement</Text>
            <Text style={[styles.modalSub, { color: colors.textMuted }]}>
              Send an instant push banner to all {PLATFORM_METRICS.totalStudents} registered students.
            </Text>

            <TextInput
              style={[
                styles.modalInput,
                {
                  backgroundColor: isDark ? '#1F2937' : '#F3F4F6',
                  color: colors.text,
                  borderColor: colors.border,
                  height: 80,
                  textAlignVertical: 'top',
                },
              ]}
              placeholder="e.g. Weekend Sprint Challenge: Complete 2 modules for 2x XP!"
              placeholderTextColor={colors.textMuted}
              multiline
              value={announcementText}
              onChangeText={setAnnouncementText}
            />

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={[styles.modalCancelBtn, { borderColor: colors.border }]}
                onPress={() => setAnnouncementModalVisible(false)}
              >
                <Text style={[styles.modalCancelText, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalConfirmBtn, { backgroundColor: colors.primary }]}
                onPress={handleSendBroadcast}
              >
                <Text style={styles.modalConfirmText}>Send Broadcast</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 54 : 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  ownerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  ownerBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  exitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  exitButtonText: {
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 4,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  alertBannerText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    marginHorizontal: 8,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 6,
  },
  scrollContent: {
    padding: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  growthBadge: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCard: {
    flex: 1,
    minWidth: '46%',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  kpiIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 2,
  },
  kpiLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
  },
  kpiSub: {
    fontSize: 11,
    fontWeight: '700',
  },
  actionButtonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  actionBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 6,
  },
  secondaryActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  secondaryActionText: {
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 6,
  },
  trackListCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  trackPerformanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  trackRankCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  trackRankText: {
    fontSize: 12,
    fontWeight: '800',
  },
  trackInfo: {
    flex: 1,
  },
  trackName: {
    fontSize: 14,
    fontWeight: '700',
  },
  trackCat: {
    fontSize: 12,
    marginTop: 2,
  },
  trackRateBox: {
    alignItems: 'flex-end',
  },
  trackRateVal: {
    fontSize: 15,
    fontWeight: '800',
  },
  trackRateSub: {
    fontSize: 10,
  },
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
  },
  filterChipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  rosterCountText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 12,
  },
  studentCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 12,
  },
  studentCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  studentAvatarText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
  studentDetails: {
    flex: 1,
  },
  studentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  studentName: {
    fontSize: 15,
    fontWeight: '700',
  },
  tierBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  tierBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  studentEmail: {
    fontSize: 12,
    marginTop: 2,
  },
  studentMetricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricItemVal: {
    fontSize: 13,
    fontWeight: '800',
  },
  metricItemLbl: {
    fontSize: 10,
    marginTop: 1,
  },
  metricDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#9CA3AF40',
  },
  enrolledTracksBox: {
    marginBottom: 10,
  },
  enrolledLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  enrolledTracksWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  trackMiniChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  trackMiniChipText: {
    fontSize: 10,
    fontWeight: '700',
  },
  studentCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
  },
  lastActiveText: {
    fontSize: 11,
  },
  grantXPBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  grantXPText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },
  trackDetailCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  trackDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  trackIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  trackDetailTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  trackDetailCat: {
    fontSize: 12,
    marginTop: 2,
  },
  accuracyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  accuracyText: {
    fontSize: 11,
    fontWeight: '700',
  },
  progressStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressStatCol: {
    alignItems: 'center',
  },
  progressStatVal: {
    fontSize: 16,
    fontWeight: '800',
  },
  progressStatLbl: {
    fontSize: 11,
    marginTop: 2,
  },
  trackProgressBarBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  trackProgressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF444420',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  liveText: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  activityFeedCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  activityAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityAvatarText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '800',
  },
  activityContent: {
    flex: 1,
  },
  activityUser: {
    fontSize: 14,
    fontWeight: '700',
  },
  activityAction: {
    fontSize: 12,
    marginTop: 1,
  },
  activityTrack: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityXP: {
    fontSize: 12,
    fontWeight: '800',
  },
  activityTime: {
    fontSize: 10,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalBox: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
  },
  modalSub: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 16,
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '700',
  },
  modalConfirmBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalConfirmText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
