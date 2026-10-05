import { ScrollView, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { Header } from "../../components/Header";
import { useTheme } from "../../theme/ThemeContext";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { useStats } from "../../api/hooks/useSatats";

export default function About() {
    const { data: stats, isLoading } = useStats();
    const version = Constants.expoConfig?.version;
    const styles = useThemedStyles(createAboutStyles);

    return (
        <View style={styles.container}>
            <Header title="About" />
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.titleBlock}>
                    <Text style={styles.title}>Street Food Safari</Text>
                    <Text style={styles.version}>Version {version}</Text>
                </View>

                <Text style={styles.description}>
                    Discover street food vendors from cities around the world. Browse menus, save your favorites, and read reviews from fellow travelers.
                </Text>

                {!isLoading && stats && (
                    <View style={styles.statsCard}>
                        <Text style={styles.statsTitle}>By the numbers</Text>
                        <Text style={styles.statsText}>{stats.total} vendors</Text>
                        <Text style={styles.statsText}>{Object.keys(stats.byCity).length} cities</Text>
                        <Text style={styles.statsText}>{Object.keys(stats.byCuisine).length} cuisines</Text>
                    </View>
                )}

                <Text style={styles.credit}>
                    Vendor photos courtesy of Picsum Photos.
                </Text>
            </ScrollView>
        </View>
    );
}

function createAboutStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.bg },
        content: { padding: 20, gap: 16 },
        titleBlock: { alignItems: "center", gap: 4, marginBottom: 10 },
        title: { fontSize: 28, fontWeight: "700", color: colors.textMain },
        version: { fontSize: 14, color: colors.textSecondary },
        description: { fontSize: 15, color: colors.textMain, lineHeight: 22 },
        statsCard: { backgroundColor: colors.card, borderRadius: 12, padding: 16, gap: 10, borderWidth: 1, borderColor: colors.border },
        statsTitle: { fontSize: 16, fontWeight: "600", color: colors.textMain },
        statsText: { color: colors.textSecondary },
        credit: { fontSize: 12, color: colors.textMuted, marginTop: 10 },
    });
}
