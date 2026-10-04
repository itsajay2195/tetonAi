import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { useTheme } from '../../theme/ThemeContext';
import { useMemo } from 'react';

type Props = {
    handleMenuPress: () => void;
    handleReviewsPress: () => void;
    reviewsCount?: number;
    isMenuActive?: boolean;

};

const MenuReviewsTabs = ({ handleMenuPress, handleReviewsPress, reviewsCount, isMenuActive }: Props) => {
    const { colors } = useTheme();
    const hasReviews = reviewsCount && reviewsCount > 0;
    const displayReviewsCount = hasReviews ? reviewsCount : 0;
    const reviewsText = hasReviews ? `Reviews (${displayReviewsCount})` : "Reviews";
    const menuTabStyle = useMemo((): ViewStyle => ({
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isMenuActive ? colors.card : "transparent",
        paddingVertical: 4,
        borderRadius: 10,
    }), [isMenuActive, colors.card]);

    const reviewsTabStyle = useMemo((): ViewStyle => ({
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: !isMenuActive ? colors.card : "transparent",
        paddingVertical: 4,
        borderRadius: 10,
    }), [isMenuActive, colors.card]);
    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 4, borderRadius: 10, backgroundColor: colors.surface, }}>
            <Pressable style={menuTabStyle} onPress={handleMenuPress}>
                < Text style={{ color: colors.textMain, fontWeight: isMenuActive ? "700" : "400" }}> Menu</Text >
            </Pressable>
            <Pressable style={reviewsTabStyle} onPress={handleReviewsPress}>

                <Text style={{ color: colors.textMain, fontWeight: !isMenuActive ? "700" : "400" }}>{reviewsText}</Text>
            </Pressable>
        </View>
    )
}

export default MenuReviewsTabs




