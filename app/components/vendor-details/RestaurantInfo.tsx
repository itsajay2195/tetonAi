import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '../../theme/ThemeContext';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { primitives } from '../../theme/colors';
import ExpandableText from '../ExpandableText';

type Props = {
    cuisine: string;
    name: string;
    rating: number;
    description: string;
    menuLength: number;
    reviewsCount?: number
};

const RestaurantInfo = ({ cuisine, name, reviewsCount, rating, description, menuLength }: Props) => {
    const styles = useThemedStyles(createRestaurantInfoStyles);
    return (
        <View style={styles.container}>
            <Text style={styles.cuisine}>{cuisine}</Text>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.metaRow}>
                <View style={styles.ratingRow}>
                    <Ionicons name="star" size={16} color={primitives.yellow[500]} />
                    <Text style={styles.ratingText}>{rating}</Text>
                </View>
                {reviewsCount ? (
                    <Text style={styles.metaText}>{reviewsCount} reviews</Text>
                ) : null}
                <Text style={styles.metaText}>{menuLength} dishes</Text>
            </View>
            <ExpandableText text={description} lines={3} />
        </View>
    )
}

export default RestaurantInfo

function createRestaurantInfoStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        container: { gap: 4 },
        cuisine: { fontSize: 16, fontWeight: "bold", color: colors.primary },
        name: { fontSize: 20, color: colors.textMain, fontWeight: "500" },
        metaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
        ratingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
        ratingText: { fontSize: 14, color: colors.textMain, fontWeight: "700" },
        metaText: { fontSize: 14, color: colors.textSecondary, textDecorationLine: "underline" },
    });
}
