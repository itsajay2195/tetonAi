import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";
import { tokens } from "../../theme/colors";

type Props = {
    type: "spicy" | "vegan";
};

export function DietBadge({ type }: Props) {
    const { colors } = useTheme();
    const isSpicy = type === "spicy";

    return (
        <View
            style={[
                styles.badge,
                { backgroundColor: isSpicy ? colors.spicyBg : colors.veganBg },
            ]}
        >
            <Ionicons
                name={isSpicy ? "flame" : "leaf"}
                size={12}
                color={isSpicy ? colors.spicyText : colors.veganText}
            />
            <Text style={[styles.label, { color: isSpicy ? colors.spicyText : colors.veganText }]}>
                {isSpicy ? "Spicy" : "Vegan"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        height: 24,
        paddingHorizontal: tokens.spacing.sm,
        borderRadius: tokens.borderRadius.full,
    },
    label: {
        fontSize: tokens.fontSize.xs,
        fontWeight: "600",
    },
});
