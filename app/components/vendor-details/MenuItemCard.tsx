import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '../../theme/ThemeContext';
import { DietBadge } from './DietBadge';

type Props = {
    item: {
        name: string;
        price: number;
        spicy: boolean;
        vegan: boolean;
    };
};
const MenuItemCard = ({ item }: Props) => {
    const { colors } = useTheme();
    return (
        <View style={{ paddingHorizontal: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10, }}>
                <Text style={{ fontSize: 16, fontWeight: "500", color: colors.textMain }}>{item?.name}</Text>
                <Text style={{ fontSize: 16, fontWeight: "500", color: colors.textMain }}>${item?.price?.toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center", minHeight: 24, marginTop: 4 }}>
                {item?.spicy && <DietBadge type="spicy" />}
                {item?.vegan && <DietBadge type="vegan" />}
            </View>


        </View>
    )
}

export default MenuItemCard

const styles = StyleSheet.create({})