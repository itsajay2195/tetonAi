import { View, Text } from "react-native";
import { useTheme } from "../theme/ThemeContext";

type Props = {
    text: string;
};

export function EmptyState({ text }: Props) {
    const { colors } = useTheme();
    return (
        <View style={{ alignItems: 'center', paddingVertical: 20 }}>
            <Text style={{ color: colors.textSecondary }}>{text}</Text>
        </View>
    );
}
