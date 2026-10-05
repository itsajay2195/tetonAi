import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "./ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";

const SnackbarContext = createContext<{ showError: (message: string) => void } | null>(null);

export function SnackbarProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState<string | null>(null);
    const showError = useCallback((msg: string) => setMessage(msg), []);
    const hide = useCallback(() => setMessage(null), []);

    return (
        <SnackbarContext.Provider value={{ showError }}>
            {children}
            <SnackbarBanner message={message} onHide={hide} />
        </SnackbarContext.Provider>
    );
}

export function useSnackbar() {
    const ctx = useContext(SnackbarContext);
    if (!ctx) throw new Error("useSnackbar must be used within a SnackbarProvider");
    return ctx;
}

function SnackbarBanner({ message, onHide }: { message: string | null; onHide: () => void }) {
    const styles = useThemedStyles(createSnackbarStyles);

    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(onHide, 3000);
        return () => clearTimeout(timer);
    }, [message, onHide]);

    if (!message) return null;

    return (
        <View style={styles.banner}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

function createSnackbarStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        banner: { position: "absolute", bottom: 40, left: 20, right: 20, backgroundColor: colors.errorBg, padding: 12, borderRadius: 10 },
        text: { color: colors.errorText },
    });
}
