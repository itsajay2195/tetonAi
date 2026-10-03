// components/NoNetworkBanner.tsx
import { View, Text } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { useTheme } from "../theme/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function NoNetworkBanner() {
    const insets = useSafeAreaInsets();
    const { isConnected } = useNetInfo();
    const { colors } = useTheme();
    if (isConnected !== false) return null;
    return (
        <View style={{ backgroundColor: colors.errorBg, padding: 6, alignItems: "center", position: "absolute", top: insets.top, left: 0, right: 0, zIndex: 9999 }}>
            <Text style={{ color: colors.errorText, fontSize: 12, fontWeight: "600" }}>No internet connection</Text>
        </View>
    );
}
