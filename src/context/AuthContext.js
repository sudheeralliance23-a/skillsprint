import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth, isFirebaseLive } from '../config/firebase';
import { INITIAL_USER_PROFILE } from '../data/seedData';

const AUTH_USER_KEY = '@skillsprint_auth_user';

const AuthContext = createContext({
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
  signUp: async () => {},
  login: async () => {},
  loginWithGoogle: async () => {},
  loginAsDemo: async () => {},
  logout: async () => {},
  updateUserProfile: async () => {},
  clearError: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe = null;

    const initAuth = async () => {
      try {
        // First check local AsyncStorage for active persisted session
        const storedUser = await AsyncStorage.getItem(AUTH_USER_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        // If Firebase is available, also attach auth listener
        if (auth && isFirebaseLive) {
          unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
            if (fbUser) {
              const enrichedUser = {
                id: fbUser.uid,
                name: fbUser.displayName || 'Learner',
                email: fbUser.email,
                avatarUrl: fbUser.photoURL || INITIAL_USER_PROFILE.avatarUrl,
                skillLevel: 'Intermediate',
                currentStreak: 1,
                bestStreak: 1,
                totalXP: 100,
                joinedAt: fbUser.metadata?.creationTime || new Date().toISOString(),
              };
              setUser(enrichedUser);
              await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(enrichedUser));
            }
          });
        }
      } catch (err) {
        console.warn('Error restoring auth session:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const clearError = () => setError(null);

  const signUp = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      if (!name || name.trim().length < 2) {
        throw new Error('Please enter your full name (at least 2 characters)');
      }
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Please provide a valid email address');
      }
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      let newUser = null;

      if (auth && isFirebaseLive) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        newUser = {
          id: cred.user.uid,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          avatarUrl: INITIAL_USER_PROFILE.avatarUrl,
          skillLevel: 'Beginner',
          currentStreak: 1,
          bestStreak: 1,
          totalXP: 50,
          joinedAt: new Date().toISOString(),
        };
      } else {
        // Fallback local auth simulation with instant persistence
        await new Promise((res) => setTimeout(res, 400));
        newUser = {
          id: 'user_' + Date.now(),
          name: name.trim(),
          email: email.trim().toLowerCase(),
          avatarUrl: INITIAL_USER_PROFILE.avatarUrl,
          skillLevel: 'Beginner',
          currentStreak: 1,
          bestStreak: 1,
          totalXP: 50,
          joinedAt: new Date().toISOString(),
        };
      }

      setUser(newUser);
      await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
      return newUser;
    } catch (err) {
      const msg = err?.message?.replace('Firebase: ', '') || 'Failed to sign up. Please try again.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Please enter a valid email address');
      }
      if (!password || password.length < 1) {
        throw new Error('Please enter your password');
      }

      let loggedInUser = null;

      if (auth && isFirebaseLive) {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        loggedInUser = {
          id: cred.user.uid,
          name: cred.user.displayName || email.split('@')[0],
          email: cred.user.email,
          avatarUrl: cred.user.photoURL || INITIAL_USER_PROFILE.avatarUrl,
          skillLevel: 'Intermediate',
          currentStreak: 5,
          bestStreak: 12,
          totalXP: 680,
          joinedAt: cred.user.metadata?.creationTime || new Date().toISOString(),
        };
      } else {
        // Fast local auth validation
        await new Promise((res) => setTimeout(res, 350));
        loggedInUser = {
          ...INITIAL_USER_PROFILE,
          email: email.trim().toLowerCase(),
          name: email.split('@')[0].replace('.', ' ').replace(/^\w/, (c) => c.toUpperCase()),
        };
      }

      setUser(loggedInUser);
      await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(loggedInUser));
      return loggedInUser;
    } catch (err) {
      const msg = err?.message?.replace('Firebase: ', '') || 'Invalid email or password.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate Google Sign-In with realistic student persona
      await new Promise((res) => setTimeout(res, 450));
      const googleUser = {
        id: 'google_user_' + Date.now(),
        name: 'Jordan Rivera',
        email: 'jordan.rivera@gmail.com',
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
        skillLevel: 'Intermediate',
        currentStreak: 3,
        bestStreak: 8,
        totalXP: 450,
        joinedAt: new Date().toISOString(),
      };
      setUser(googleUser);
      await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(googleUser));
      return googleUser;
    } catch (err) {
      setError('Google Sign-In was cancelled or failed.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemo = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((res) => setTimeout(res, 200));
      setUser(INITIAL_USER_PROFILE);
      await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(INITIAL_USER_PROFILE));
      return INITIAL_USER_PROFILE;
    } catch (err) {
      setError('Failed to log in as demo user.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (auth && isFirebaseLive) {
        await signOut(auth);
      }
      await AsyncStorage.removeItem(AUTH_USER_KEY);
      setUser(null);
    } catch (err) {
      console.warn('Error during logout:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updates) => {
    try {
      const updated = { ...user, ...updates };
      setUser(updated);
      await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(updated));
      return updated;
    } catch (err) {
      console.warn('Error updating profile:', err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        signUp,
        login,
        loginWithGoogle,
        loginAsDemo,
        logout,
        updateUserProfile,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
