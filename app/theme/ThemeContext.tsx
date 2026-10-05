import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightColors, darkColors } from "./colors";

const THEME_STORAGE_KEY = "themePreference";

type ThemeName = "light" | "dark";

const ThemeContext = createContext<{
    theme: ThemeName;
    colors: typeof lightColors;
    toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const systemScheme = useColorScheme();
    const [theme, setTheme] = useState<ThemeName>(systemScheme === "dark" ? "dark" : "light");
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        (async () => {
            const value = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (value === "light" || value === "dark") {
                setTheme(value);
            }
            setIsHydrated(true);
        })();
    }, []);

    const toggleTheme = useCallback(() => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        AsyncStorage.setItem(THEME_STORAGE_KEY, next);
    }, [theme]);

    const colors = theme === "dark" ? darkColors : lightColors;

    if (!isHydrated) return null;

    return (
        <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}


export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
    return ctx;
}
