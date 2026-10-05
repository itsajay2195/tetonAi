import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";

type Props = {
    text: string;
};

export function EmptyState({ text }: Props) {
    const styles = useThemedStyles(createEmptyStateStyles);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

function createEmptyStateStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        container: { alignItems: 'center', paddingVertical: 20 },
        text: { color: colors.textSecondary },
    });
}
