import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
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
    const { colors } = useTheme();

    return (
        <View style={{ flexDirection: "row", gap: 8 }}>
            {FILTERS.map(({ key, label }) => {
                const isActive = selected === key;
                return (
                    <Pressable
                        key={key}
                        onPress={() => onSelect(key)}
                        style={{
                            paddingHorizontal: tokens.spacing.md,
                            paddingVertical: 6,
                            borderRadius: tokens.borderRadius.full,
                            backgroundColor: isActive ? colors.primary : colors.surface,
                            borderWidth: 1,
                            borderColor: isActive ? colors.primary : colors.border,
                        }}
                    >
                        <Text style={{ color: isActive ? colors.textOnPrimary : colors.textSecondary, fontSize: tokens.fontSize.sm, fontWeight: isActive ? "600" : "400" }}>
                            {label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
