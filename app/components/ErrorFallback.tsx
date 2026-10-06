import { View, Text, StyleSheet } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { useTheme } from "../theme/ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";

type Props = {
    onReset: () => void;
};

export function ErrorFallback({ onReset }: Props) {
    const styles = useThemedStyles(createErrorFallbackStyles);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Something went wrong</Text>
            <Text style={styles.message}>
                The app ran into an unexpected error. Try again, and if it keeps happening, restart the app.
            </Text>
            <View style={styles.buttonWrapper}>
                <PrimaryButton label="Try again" onPress={onReset} />
            </View>
        </View>
    );
}

function createErrorFallbackStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: colors.bg },
        title: { fontSize: 20, fontWeight: "700", color: colors.textMain, marginBottom: 8 },
        message: { fontSize: 14, color: colors.textSecondary, textAlign: "center", marginBottom: 20 },
        buttonWrapper: { width: "80%" },
    });
}
