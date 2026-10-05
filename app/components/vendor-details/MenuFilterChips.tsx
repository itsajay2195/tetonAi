import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { tokens } from '../../theme/colors';

type Filter = "all" | "spicy" | "vegan";

type Props = {
    selected: Filter;
    onSelect: (filter: Filter) => void;
};

const FILTERS: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "spicy", label: "Spicy" },
    { key: "vegan", label: "Vegan" },
];

export function MenuFilterChips({ selected, onSelect }: Props) {
    const styles = useThemedStyles(createMenuFilterChipsStyles);

    return (
        <View style={styles.row}>
            {FILTERS.map(({ key, label }) => {
                const isActive = selected === key;
                return (
                    <Pressable
                        key={key}
                        onPress={() => onSelect(key)}
                        style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
                    >
                        <Text style={isActive ? styles.labelActive : styles.labelInactive}>
                            {label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

function createMenuFilterChipsStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        row: { flexDirection: "row", gap: 8 },
        chip: {
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: 6,
            borderRadius: tokens.borderRadius.full,
            borderWidth: 1,
        },
        chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
        chipInactive: { backgroundColor: colors.surface, borderColor: colors.border },
        labelActive: { color: colors.textOnPrimary, fontSize: tokens.fontSize.sm, fontWeight: "600" },
        labelInactive: { color: colors.textSecondary, fontSize: tokens.fontSize.sm, fontWeight: "400" },
    });
}
