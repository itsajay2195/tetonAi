// components/NoNetworkBanner.tsx
import { View, Text } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { useTheme } from "../theme/ThemeContext";

export function NoNetworkBanner() {
    const { isConnected } = useNetInfo();
    const { colors } = useTheme();

    if (isConnected !== false) return null;

    return (
        <View style={{ backgroundColor: colors.errorBg, padding: 6, alignItems: "center" }}>
            <Text style={{ color: colors.errorText, fontSize: 12, fontWeight: "600" }}>No internet connection</Text>
        </View>
    );
}
