import { Text, View, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import ThemeToggleButton from "./ThemeToggleButton";
import { SearchBar } from "./Searchbar";
import { useThemedStyles } from "../hooks/useThemedStyles";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { useCallback } from "react";

type Props = {
    title?: string;
    showSearch?: boolean;
    searchQuery?: string;
    onSearchQueryChange?: (text: string) => void;
    rightChild?: React.ReactNode;
    variant?: "default" | "floating";
};

export function Header({ title, showSearch, searchQuery, onSearchQueryChange, rightChild, variant = "default", }: Props) {
    const insets = useSafeAreaInsets();
    const styles = useThemedStyles((colors) => createHeaderStyles(colors, insets.top));
    const { colors } = useTheme();
    const navgation = useNavigation();
    const handleBackPress = useCallback(() => {
        navgation.goBack();
    }, [navgation]);
    if (variant === "floating") {
        return (
            <View style={[styles.container, { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1, backgroundColor: "transparent" }]}>
                <Pressable onPress={handleBackPress} style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.overlayButtonBg, borderRadius: 20, }}>
                    <Ionicons name="chevron-back" size={18} color={colors.overlayButtonIcon} />
                </Pressable>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    {rightChild}
                </View>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            {title ? <Text style={{ color: colors.textMain, fontSize: 20, fontWeight: 'bold' }}>
                {title}
            </Text> : null}
            {showSearch && (
                <SearchBar value={searchQuery ?? ""} onChangeText={onSearchQueryChange ?? (() => { })} />
            )}
            <ThemeToggleButton />
        </View>
    );
}

function createHeaderStyles(colors: ReturnType<typeof useTheme>["colors"], topInset: number) {
    return StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 60,
            paddingHorizontal: 10,
            gap: 10,
            backgroundColor: colors.bg,
            marginTop: topInset,
        },

    });
}


