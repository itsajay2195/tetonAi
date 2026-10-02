import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { useTheme } from '../../theme/ThemeContext';

type Props = {
    handleMenuPress: () => void;
    handleReviewsPress: () => void;
    menuTabStyle: ViewStyle;
    reviewsTabStyle: ViewStyle;
    reviewsCount?: number;
    isMenuActive?: boolean;
};

const MenuReviewsTabs = ({ handleMenuPress, handleReviewsPress, menuTabStyle, reviewsTabStyle, reviewsCount, isMenuActive }: Props) => {
    const { colors } = useTheme();
    const hasReviews = reviewsCount && reviewsCount > 0;
    const displayReviewsCount = hasReviews ? reviewsCount : 0;
    const reviewsText = hasReviews ? `Reviews (${displayReviewsCount})` : "Reviews";
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

const styles = StyleSheet.create({})
// MenuReviewsTabs.tsx Props: add isMenuActive: boolean

