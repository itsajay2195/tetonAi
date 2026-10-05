import { View, Text, StyleSheet } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { useTheme } from "../theme/ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";

type Props = {
    message?: string;
    onRetry: () => void;
};

export function ErrorState({ message = "Something went wrong.", onRetry }: Props) {
    const styles = useThemedStyles(createErrorStateStyles);
    return (
        <View style={styles.container}>
            <Text style={styles.message}>{message}</Text>
            <View style={styles.buttonWrapper}>
                <PrimaryButton label="Retry" onPress={onRetry} />
            </View>
        </View>
    );
}

function createErrorStateStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: colors.bg },
        message: { color: colors.textMain, fontSize: 16, textAlign: "center", marginBottom: 16 },
        buttonWrapper: { width: "80%" },
    });
}
