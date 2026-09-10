import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { TrackCard } from '../components/TrackCard';

const CATEGORIES = [
  'All',
  'Technology',
  'Communication',
  'Data & AI',
  'Cognitive Skills',
  'Business & Growth',
  'Career & Professional',
];

export const ExploreScreen = ({ navigation }) => {
  const { colors, typography, borderRadius, shadows } = useTheme();
  const { tracks, enrolledTrackIds, completedModuleIds, refreshing, refreshData } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTracks = useMemo(() => {
    return tracks.filter((track) => {
      const matchesCategory =
        selectedCategory === 'All' || track.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchesSearch =
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [tracks, selectedCategory, searchQuery]);

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
          Explore Tracks
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary, fontSize: typography.fontSize.xs }]}>
          Discover 30+ interactive skill sprints
        </Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchSection}>
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: colors.surfaceCard,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
              ...shadows.sm,
            },
          ]}
        >
          <Ionicons name="search-outline" size={20} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search tracks, coding, public speaking..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter Chips */}
      <View style={styles.categorySection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.surfaceCard,
                    borderColor: isSelected ? colors.primary : colors.border,
                    borderRadius: borderRadius.full,
                    ...(isSelected ? shadows.sm : {}),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    {
                      color: isSelected ? '#FFFFFF' : colors.textSecondary,
                      fontWeight: isSelected ? '700' : '500',
                    },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Track List / Grid */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshData}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {filteredTracks.length === 0 ? (
          /* Empty Search State */
          <View style={styles.emptyState}>
            <View style={[styles.emptyIconCircle, { backgroundColor: colors.surfaceElevated }]}>
              <Ionicons name="search" size={36} color={colors.textMuted} />
            </View>
            <Text
              style={[
                styles.emptyTitle,
                { color: colors.text, fontSize: typography.fontSize.lg, fontWeight: '700' },
              ]}
            >
              No tracks found
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              We couldn't find any skill tracks matching "{searchQuery}". Try a different keyword or category.
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              style={[
                styles.resetButton,
                {
                  backgroundColor: colors.primary,
                  borderRadius: borderRadius.full,
                },
              ]}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.tracksList}>
            <Text style={[styles.resultsCount, { color: colors.textMuted }]}>
              Showing {filteredTracks.length} skill tracks
            </Text>
            {filteredTracks.map((track) => {
              const comp = track.modules
                ? track.modules.filter((m) => completedModuleIds.includes(m.id)).length
                : 0;
              const isEnrolled = enrolledTrackIds.includes(track.id);

              return (
                <TrackCard
                  key={track.id}
                  track={track}
                  variant="vertical"
                  completedModules={comp}
                  isEnrolled={isEnrolled}
                  onPress={() => navigation.navigate('TrackDetail', { trackId: track.id })}
                />
              );
            })}
          </View>
        )}
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
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  headerTitle: {
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    marginTop: 2,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 8,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
  },
  clearButton: {
    padding: 4,
  },
  categorySection: {
    paddingVertical: 6,
  },
  chipsScroll: {
    paddingHorizontal: 20,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    marginRight: 8,
  },
  chipText: {
    fontSize: 12,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  tracksList: {
    gap: 4,
  },
  resultsCount: {
    fontSize: 12,
    marginBottom: 10,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    marginBottom: 8,
  },
  emptySubtitle: {
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  resetButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
