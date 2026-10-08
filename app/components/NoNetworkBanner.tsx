import { View, Text, StyleSheet } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { useTheme } from "../theme/ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function NoNetworkBanner() {
    const insets = useSafeAreaInsets();
    const { isConnected } = useNetInfo();
    const styles = useThemedStyles((colors) => createNoNetworkStyles(colors, insets.top));
    if (isConnected !== false) return null;
    return (
        <View style={styles.banner}>
            <Text style={styles.text}>No internet connection</Text>
        </View>
    );
}

function createNoNetworkStyles(colors: ReturnType<typeof useTheme>["colors"], topInset: number) {
    return StyleSheet.create({
        banner: { backgroundColor: colors.errorBg, padding: 6, alignItems: "center", position: "absolute", top: topInset, left: 0, right: 0, zIndex: 9999 },
        text: { color: colors.errorText, fontSize: 12, fontWeight: "600" },
    });
}
