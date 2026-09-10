import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Firebase configuration object (configurable via environment or placeholder for demo)
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "AIzaSySkillSprintMockApiKeyDemo123456",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "skillsprint-app.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "skillsprint-app",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "skillsprint-app.appspot.com",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890"
};

let app = null;
let auth = null;
let db = null;
let isFirebaseLive = false;

try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  // Set up auth with AsyncStorage persistence for React Native
  if (Platform.OS === 'web') {
    auth = getAuth(app);
  } else {
    try {
      auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });
    } catch (authInitErr) {
      auth = getAuth(app);
    }
  }

  db = getFirestore(app);
  // If API key is not the demo placeholder, mark live
  if (process.env.EXPO_PUBLIC_FIREBASE_API_KEY && !process.env.EXPO_PUBLIC_FIREBASE_API_KEY.includes('Mock')) {
    isFirebaseLive = true;
  }
} catch (error) {
  console.log('Firebase initialized in resilient offline/local mode:', error?.message);
}

export { app, auth, db, isFirebaseLive, firebaseConfig };
