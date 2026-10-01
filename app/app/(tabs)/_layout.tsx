import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";
import { StyleSheet } from "react-native";
import { useMemo } from "react";

export default function TabsLayout() {
    const colors = useTheme().colors;
    const styles = useMemo(() => createTabStyles(colors), [colors]);

    return (
        <Tabs screenOptions={{
            headerShown: false, tabBarStyle: styles.tabBarStyle,
            tabBarActiveTintColor: colors.accent,
            tabBarInactiveTintColor: colors.textMuted,
        }}>
            <Tabs.Screen
                name="vendors"
                options={{
                    title: "Vendors",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="storefront" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: "Favorites",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    title: "About",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="information-circle" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

function createTabStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        tabBarStyle: {

            backgroundColor: colors.bg,
        },
    });
}
