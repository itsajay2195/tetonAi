import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme/ThemeContext';
import { useThemedStyles } from '../../hooks/useThemedStyles';
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
    const styles = useThemedStyles(createMenuItemStyles);
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.text}>{item?.name}</Text>
                <Text style={styles.text}>${item?.price?.toFixed(2)}</Text>
            </View>
            <View style={styles.badgeRow}>
                {item?.spicy && <DietBadge type="spicy" />}
                {item?.vegan && <DietBadge type="vegan" />}
            </View>
        </View>
    )
}

export default MenuItemCard

function createMenuItemStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        container: { paddingHorizontal: 10 },
        row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 },
        text: { fontSize: 16, fontWeight: "500", color: colors.textMain },
        badgeRow: { flexDirection: "row", gap: 10, alignItems: "center", minHeight: 24, marginTop: 4 },
    });
}
