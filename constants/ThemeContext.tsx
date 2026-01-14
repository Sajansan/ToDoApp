import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme as useNativeColorScheme } from "react-native";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  colorScheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@todo_app_theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const nativeColorScheme = useNativeColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        setThemeModeState(savedTheme as ThemeMode);
      }
    } catch (e) {
      console.error("Failed to load theme", e);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (e) {
      console.error("Failed to save theme", e);
    }
  };

  const colorScheme =
    themeMode === "system" ? nativeColorScheme ?? "light" : themeMode;

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        setThemeMode,
        colorScheme: colorScheme as "light" | "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
