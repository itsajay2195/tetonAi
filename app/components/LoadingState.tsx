import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";

export function LoadingState() {
    const { colors } = useTheme();
    const styles = useThemedStyles(createLoadingStateStyles);
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
}

function createLoadingStateStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.bg },
    });
}
