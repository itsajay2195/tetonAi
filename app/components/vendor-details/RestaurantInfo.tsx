import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '../../theme/ThemeContext';
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
    const { colors } = useTheme();
    return (
        <View style={{ display: "flex", gap: 4 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.primary }}>{cuisine}</Text>
            <Text style={{ fontSize: 20, color: colors.textMain, fontWeight: "500" }}>{name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Ionicons name="star" size={16} color={primitives.yellow[500]} />
                    <Text style={{ fontSize: 14, color: colors.textMain, fontWeight: "700" }}>{rating}</Text>
                </View>

                {reviewsCount ? (<View >
                    <Text style={{ fontSize: 14, color: colors.textSecondary, textDecorationLine: "underline" }}>{reviewsCount} reviews</Text>
                </View>) : null}

                <Text style={{ fontSize: 14, color: colors.textSecondary, textDecorationLine: "underline" }}>{menuLength} dishes</Text>

            </View>
            <ExpandableText text={description} lines={3} />
        </View>
    )
}

export default RestaurantInfo

const styles = StyleSheet.create({})