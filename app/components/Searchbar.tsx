import { useMemo } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { tokens } from "../theme/colors";

type Props = {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
};

export function SearchBar({ value, onChangeText, placeholder = "Search vendors..." }: Props) {
    const { colors } = useTheme();
    const styles = useMemo(() => createStyles(colors), [colors]);

    return (
        <View style={styles.container}>
            <Ionicons name="search" size={18} color={colors.textMuted} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={colors.textMuted}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

function createStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.borderRadius.md,
            paddingHorizontal: tokens.spacing.sm,
            height: 40,
            flex: 1,
        },
        input: {
            flex: 1,
            padding: tokens.spacing.sm,
            color: colors.textMain,
        },
    });
}