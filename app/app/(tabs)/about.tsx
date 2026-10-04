import { ScrollView, Text, View } from "react-native";
import Constants from "expo-constants";
import { Header } from "../../components/Header";
import { useTheme } from "../../theme/ThemeContext";
import { useStats } from "../../api/hooks/useSatats";

export default function About() {
    const { colors } = useTheme();
    const { data: stats, isLoading } = useStats();
    const version = Constants.expoConfig?.version;

    return (
        <View style={{ flex: 1, backgroundColor: colors.bg }}>
            <Header title="About" />
            <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
                <View style={{ alignItems: "center", gap: 4, marginBottom: 10 }}>
                    <Text style={{ fontSize: 28, fontWeight: "700", color: colors.textMain }}>Street Food Safari</Text>
                    <Text style={{ fontSize: 14, color: colors.textSecondary }}>Version {version}</Text>
                </View>

                <Text style={{ fontSize: 15, color: colors.textMain, lineHeight: 22 }}>
                    Discover street food vendors from cities around the world. Browse menus, save your favorites, and read reviews from fellow travelers.
                </Text>

                {!isLoading && stats && (
                    <View style={{ backgroundColor: colors.card, borderRadius: 12, padding: 16, gap: 10, borderWidth: 1, borderColor: colors.border }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", color: colors.textMain }}>By the numbers</Text>
                        <Text style={{ color: colors.textSecondary }}>{stats.total} vendors</Text>
                        <Text style={{ color: colors.textSecondary }}>{Object.keys(stats.byCity).length} cities</Text>
                        <Text style={{ color: colors.textSecondary }}>{Object.keys(stats.byCuisine).length} cuisines</Text>
                    </View>
                )}

                <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 10 }}>
                    Vendor photos courtesy of Picsum Photos.
                </Text>
            </ScrollView>
        </View>
    );
}
