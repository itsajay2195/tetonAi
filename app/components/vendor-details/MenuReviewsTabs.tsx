import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { useTheme } from '../../theme/ThemeContext';

type Props = {
    handleMenuPress: () => void;
    handleReviewsPress: () => void;
    menuTabStyle: ViewStyle;
    reviewsTabStyle: ViewStyle;
};

const MenuReviewsTabs = ({ handleMenuPress, handleReviewsPress, menuTabStyle, reviewsTabStyle }: Props) => {
    const { colors } = useTheme();
    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 4, borderRadius: 10, backgroundColor: colors.surface, }}>
            <Pressable style={menuTabStyle} onPress={handleMenuPress}>
                <Text style={{ color: colors.textMain }}>Menu</Text>
            </Pressable>
            <Pressable style={reviewsTabStyle} onPress={handleReviewsPress}>
                <Text style={{ color: colors.textMain }}>Reviews</Text>
            </Pressable>
        </View>
    )
}

export default MenuReviewsTabs

const styles = StyleSheet.create({})