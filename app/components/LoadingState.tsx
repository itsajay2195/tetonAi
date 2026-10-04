import { View, ActivityIndicator } from "react-native";
import { useTheme } from "../theme/ThemeContext";

export function LoadingState() {
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
}
