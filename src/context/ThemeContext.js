import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors, typography, spacing, borderRadius, shadows } from '../theme/theme';

const THEME_STORAGE_KEY = '@skillsprint_theme_mode';

const ThemeContext = createContext({
  isDark: false,
  colors: lightColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  toggleTheme: () => {},
  setThemeMode: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    try {
      const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedMode !== null) {
        setIsDark(savedMode === 'dark');
      }
    } catch (e) {
      console.warn('Failed to load theme preference', e);
    } finally {
      setIsLoaded(true);
    }
  };

  const toggleTheme = async () => {
    try {
      const nextMode = !isDark;
      setIsDark(nextMode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, nextMode ? 'dark' : 'light');
    } catch (e) {
      console.warn('Failed to save theme preference', e);
    }
  };

  const setThemeMode = async (mode) => {
    try {
      const nextIsDark = mode === 'dark';
      setIsDark(nextIsDark);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (e) {
      console.warn('Failed to set theme mode', e);
    }
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        colors,
        typography,
        spacing,
        borderRadius,
        shadows,
        toggleTheme,
        setThemeMode,
        isLoaded,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
