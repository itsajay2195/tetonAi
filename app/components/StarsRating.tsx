import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";

type Props = {
    rating: number;
    onRatingChange?: (rating: number) => void;
    size?: number;
    readOnly?: boolean;
};

export function StarRating({ rating, onRatingChange, size = 28, readOnly = false }: Props) {
    const { colors } = useTheme();
    const StarWrapper = readOnly ? View : Pressable;

    return (
        <View style={styles.container}>
            {[1, 2, 3, 4, 5].map((star) => (
                <StarWrapper key={star} {...(!readOnly && { onPress: () => onRatingChange?.(star), hitSlop: 6 })}>
                    <Ionicons name={star <= rating ? "star" : "star-outline"} size={size} color={colors.rating} />
                </StarWrapper>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: "row", gap: 4 },
});
