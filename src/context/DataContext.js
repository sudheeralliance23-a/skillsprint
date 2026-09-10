import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseLive } from '../config/firebase';
import { SKILL_TRACKS, ACHIEVEMENTS_LIST, INITIAL_USER_PROFILE } from '../data/seedData';
import { useAuth } from './AuthContext';

const STORAGE_DATA_KEY = '@skillsprint_app_data_v1';
const ASSESSMENT_STORAGE_KEY = '@skillsprint_assessment_result';

const DataContext = createContext({
  tracks: [],
  achievements: [],
  enrolledTrackIds: [],
  completedModuleIds: [],
  userProgress: {},
  assessmentResult: null,
  recommendedTracks: [],
  userStats: {
    totalXP: 0,
    currentStreak: 0,
    bestStreak: 0,
    completedModulesCount: 0,
    dailyGoalTarget: 1,
    dailyGoalProgress: 0,
  },
  weeklyActivity: [],
  loading: true,
  refreshing: false,
  getTrackById: () => null,
  getModuleById: () => null,
  enrollInTrack: async () => {},
  completeModule: async () => {},
  saveAssessment: async () => {},
  refreshData: async () => {},
  resetProgress: async () => {},
});

export const DataProvider = ({ children }) => {
  const { user, updateUserProfile } = useAuth();
  const [tracks, setTracks] = useState(SKILL_TRACKS);
  const [achievements, setAchievements] = useState(ACHIEVEMENTS_LIST);
  const [enrolledTrackIds, setEnrolledTrackIds] = useState(['track-coding', 'track-speaking']);
  const [completedModuleIds, setCompletedModuleIds] = useState(['mod-code-1', 'mod-spk-1']);
  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState(['ach-first-sprint']);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [weeklyActivity, setWeeklyActivity] = useState(INITIAL_USER_PROFILE.weeklyActivity);
  const [userStats, setUserStats] = useState({
    totalXP: INITIAL_USER_PROFILE.totalXP,
    currentStreak: INITIAL_USER_PROFILE.currentStreak,
    bestStreak: INITIAL_USER_PROFILE.bestStreak,
    completedModulesCount: 2,
    dailyGoalTarget: 1,
    dailyGoalProgress: 1,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Initialize data on mount or when user changes
  useEffect(() => {
    loadInitialData();
  }, [user?.id]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const stored = await AsyncStorage.getItem(STORAGE_DATA_KEY);
      const storedAssessment = await AsyncStorage.getItem(ASSESSMENT_STORAGE_KEY);

      if (storedAssessment) {
        const parsedAssessment = JSON.parse(storedAssessment);
        setAssessmentResult(parsedAssessment);
        if (parsedAssessment.recommendedTrackIds) {
          const recs = SKILL_TRACKS.filter((t) => parsedAssessment.recommendedTrackIds.includes(t.id));
          setRecommendedTracks(recs.length > 0 ? recs : SKILL_TRACKS.slice(0, 3));
        }
      } else {
        setRecommendedTracks(SKILL_TRACKS.slice(0, 3));
      }

      if (stored) {
        const data = JSON.parse(stored);
        if (data.enrolledTrackIds) setEnrolledTrackIds(data.enrolledTrackIds);
        if (data.completedModuleIds) setCompletedModuleIds(data.completedModuleIds);
        if (data.unlockedAchievementIds) setUnlockedAchievementIds(data.unlockedAchievementIds);
        if (data.userStats) setUserStats(data.userStats);
        if (data.weeklyActivity) setWeeklyActivity(data.weeklyActivity);
      } else if (user) {
        // Use user initial stats
        setUserStats({
          totalXP: user.totalXP || 300,
          currentStreak: user.currentStreak || 1,
          bestStreak: user.bestStreak || 1,
          completedModulesCount: 2,
          dailyGoalTarget: 1,
          dailyGoalProgress: 1,
        });
      }

      // If live Firebase, fetch user document and tracks
      if (db && isFirebaseLive && user?.id) {
        try {
          const userDocRef = doc(db, 'users', user.id);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            if (data.totalXP !== undefined) {
              setUserStats((prev) => ({
                ...prev,
                totalXP: data.totalXP,
                currentStreak: data.currentStreak || prev.currentStreak,
                bestStreak: data.bestStreak || prev.bestStreak,
              }));
            }
          }
        } catch (fbErr) {
          console.log('Firebase fetch error, using local store:', fbErr.message);
        }
      }
    } catch (err) {
      console.warn('Failed loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (updates) => {
    try {
      const current = {
        enrolledTrackIds: updates.enrolledTrackIds || enrolledTrackIds,
        completedModuleIds: updates.completedModuleIds || completedModuleIds,
        unlockedAchievementIds: updates.unlockedAchievementIds || unlockedAchievementIds,
        userStats: updates.userStats || userStats,
        weeklyActivity: updates.weeklyActivity || weeklyActivity,
      };
      await AsyncStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(current));

      // If live Firebase, persist to Firestore
      if (db && isFirebaseLive && user?.id) {
        const userDocRef = doc(db, 'users', user.id);
        await setDoc(
          userDocRef,
          {
            ...current.userStats,
            enrolledTrackIds: current.enrolledTrackIds,
            completedModuleIds: current.completedModuleIds,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      }
    } catch (err) {
      console.warn('Failed saving data:', err);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await new Promise((res) => setTimeout(res, 600));
    await loadInitialData();
    setRefreshing(false);
  };

  const getTrackById = (id) => tracks.find((t) => t.id === id) || null;

  const getModuleById = (moduleId) => {
    for (const track of tracks) {
      const found = track.modules.find((m) => m.id === moduleId);
      if (found) return { ...found, track };
    }
    return null;
  };

  const enrollInTrack = async (trackId) => {
    if (enrolledTrackIds.includes(trackId)) return;
    const nextEnrolled = [...enrolledTrackIds, trackId];
    setEnrolledTrackIds(nextEnrolled);
    await saveData({ enrolledTrackIds: nextEnrolled });
  };

  const checkAchievements = (newStats, nextCompletedIds) => {
    const newUnlocked = [...unlockedAchievementIds];
    let extraXP = 0;

    ACHIEVEMENTS_LIST.forEach((ach) => {
      if (newUnlocked.includes(ach.id)) return;

      let isMet = false;
      if (ach.condition.type === 'modules_completed' && nextCompletedIds.length >= ach.condition.target) {
        isMet = true;
      } else if (ach.condition.type === 'streak_days' && newStats.currentStreak >= ach.condition.target) {
        isMet = true;
      } else if (ach.condition.type === 'total_xp' && newStats.totalXP >= ach.condition.target) {
        isMet = true;
      }

      if (isMet) {
        newUnlocked.push(ach.id);
        extraXP += ach.xpBonus;
      }
    });

    return { newUnlocked, extraXP };
  };

  const completeModule = async (moduleId, trackId, xpEarned = 150, quizScore = 100) => {
    const isNewCompletion = !completedModuleIds.includes(moduleId);
    const nextCompletedIds = isNewCompletion
      ? [...completedModuleIds, moduleId]
      : completedModuleIds;

    const addedXP = isNewCompletion ? xpEarned : Math.round(xpEarned * 0.3); // Partial XP for practice replay
    const nextTotalXP = (userStats.totalXP || 0) + addedXP;
    const nextStreak = (userStats.currentStreak || 1) + (isNewCompletion ? 1 : 0);
    const nextBestStreak = Math.max(nextStreak, userStats.bestStreak || nextStreak);
    const nextCompletedCount = nextCompletedIds.length;

    let nextStats = {
      ...userStats,
      totalXP: nextTotalXP,
      currentStreak: nextStreak,
      bestStreak: nextBestStreak,
      completedModulesCount: nextCompletedCount,
      dailyGoalProgress: Math.min(userStats.dailyGoalTarget, (userStats.dailyGoalProgress || 0) + 1),
    };

    // Check achievement unlocks
    const { newUnlocked, extraXP } = checkAchievements(nextStats, nextCompletedIds);
    if (extraXP > 0) {
      nextStats.totalXP += extraXP;
    }

    // Auto enroll in the track if not already
    const nextEnrolled = enrolledTrackIds.includes(trackId)
      ? enrolledTrackIds
      : [...enrolledTrackIds, trackId];

    // Update today's weekly activity
    const todayStr = new Date().toISOString().split('T')[0];
    const updatedWeekly = weeklyActivity.map((dayItem) => {
      if (dayItem.date === todayStr || dayItem.day === 'Sun') {
        return {
          ...dayItem,
          completed: dayItem.completed + 1,
          xp: dayItem.xp + addedXP + extraXP,
        };
      }
      return dayItem;
    });

    setCompletedModuleIds(nextCompletedIds);
    setEnrolledTrackIds(nextEnrolled);
    setUnlockedAchievementIds(newUnlocked);
    setUserStats(nextStats);
    setWeeklyActivity(updatedWeekly);

    // Save to storage and Firestore
    await saveData({
      completedModuleIds: nextCompletedIds,
      enrolledTrackIds: nextEnrolled,
      unlockedAchievementIds: newUnlocked,
      userStats: nextStats,
      weeklyActivity: updatedWeekly,
    });

    if (user) {
      updateUserProfile({
        totalXP: nextStats.totalXP,
        currentStreak: nextStats.currentStreak,
      });
    }

    return {
      xpEarned: addedXP + extraXP,
      streak: nextStats.currentStreak,
      newAchievements: newUnlocked.filter((id) => !unlockedAchievementIds.includes(id)),
    };
  };

  const saveAssessment = async (answers) => {
    try {
      // Determine recommended tracks based on answers
      let recommendedIds = ['track-coding', 'track-speaking', 'track-data'];

      if (answers.top_focus && answers.top_focus.trackId) {
        recommendedIds = [
          answers.top_focus.trackId,
          ...recommendedIds.filter((id) => id !== answers.top_focus.trackId),
        ].slice(0, 3);
      } else if (answers.goal && answers.goal.trackIds) {
        recommendedIds = [
          ...answers.goal.trackIds,
          ...recommendedIds.filter((id) => !answers.goal.trackIds.includes(id)),
        ].slice(0, 3);
      }

      const result = {
        answers,
        recommendedTrackIds: recommendedIds,
        completedAt: new Date().toISOString(),
        calculatedLevel: answers.current_level?.level || 'Intermediate',
      };

      setAssessmentResult(result);
      const recs = SKILL_TRACKS.filter((t) => recommendedIds.includes(t.id));
      setRecommendedTracks(recs);

      await AsyncStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(result));

      // Auto enroll in the recommended tracks
      const newEnrolled = Array.from(new Set([...enrolledTrackIds, ...recommendedIds]));
      setEnrolledTrackIds(newEnrolled);
      await saveData({ enrolledTrackIds: newEnrolled });

      return result;
    } catch (err) {
      console.warn('Failed to save assessment:', err);
      throw err;
    }
  };

  const resetProgress = async () => {
    setCompletedModuleIds([]);
    setUnlockedAchievementIds(['ach-first-sprint']);
    setUserStats({
      totalXP: 100,
      currentStreak: 1,
      bestStreak: 1,
      completedModulesCount: 0,
      dailyGoalTarget: 1,
      dailyGoalProgress: 0,
    });
    await AsyncStorage.removeItem(STORAGE_DATA_KEY);
  };

  return (
    <DataContext.Provider
      value={{
        tracks,
        achievements,
        enrolledTrackIds,
        completedModuleIds,
        unlockedAchievementIds,
        assessmentResult,
        recommendedTracks,
        userStats,
        weeklyActivity,
        loading,
        refreshing,
        getTrackById,
        getModuleById,
        enrollInTrack,
        completeModule,
        saveAssessment,
        refreshData,
        resetProgress,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
