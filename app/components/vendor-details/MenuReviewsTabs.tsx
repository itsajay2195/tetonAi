import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme/ThemeContext';
import { useThemedStyles } from '../../hooks/useThemedStyles';

type Props = {
    handleMenuPress: () => void;
    handleReviewsPress: () => void;
    reviewsCount?: number;
    isMenuActive?: boolean;
};

const MenuReviewsTabs = ({ handleMenuPress, handleReviewsPress, reviewsCount, isMenuActive }: Props) => {
    const styles = useThemedStyles(createMenuReviewsTabsStyles);
    const hasReviews = reviewsCount && reviewsCount > 0;
    const reviewsText = hasReviews ? `Reviews (${reviewsCount})` : "Reviews";

    return (
        <View style={styles.container}>
            <Pressable style={[styles.tab, isMenuActive && styles.tabActive]} onPress={handleMenuPress}>
                <Text style={[styles.label, isMenuActive && styles.labelActive]}>Menu</Text>
            </Pressable>
            <Pressable style={[styles.tab, !isMenuActive && styles.tabActive]} onPress={handleReviewsPress}>
                <Text style={[styles.label, !isMenuActive && styles.labelActive]}>{reviewsText}</Text>
            </Pressable>
        </View>
    )
}

export default MenuReviewsTabs

function createMenuReviewsTabsStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        container: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 4, borderRadius: 10, backgroundColor: colors.surface },
        tab: { flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 4, borderRadius: 10, backgroundColor: "transparent" },
        tabActive: { backgroundColor: colors.card },
        label: { color: colors.textMain, fontWeight: "400" },
        labelActive: { fontWeight: "700" },
    });
}
