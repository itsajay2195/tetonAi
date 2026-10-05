import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../hooks/useThemedStyles';

type Props = {
    label: string;
    onPress: () => void;
    icon?: keyof typeof Ionicons.glyphMap;
    disabled?: boolean;
    loading?: boolean;
};

export default function PrimaryButton({ label, onPress, icon, disabled, loading }: Props) {
    const { colors } = useTheme();
    const styles = useThemedStyles(createPrimaryButtonStyles);
    const isDisabled = disabled || loading;

    return (
        <View style={styles.wrapper}>
            <Pressable
                onPress={onPress}
                disabled={isDisabled}
                style={[styles.button, { opacity: isDisabled ? 0.5 : 1 }]}
            >
                {loading ? (
                    <ActivityIndicator size="small" color={colors.textOnPrimary} />
                ) : (
                    <>
                        {icon && <Ionicons name={icon} size={10} color={colors.textOnPrimary} />}
                        <Text style={styles.label}>{label}</Text>
                    </>
                )}
            </Pressable>
        </View>
    )
}

function createPrimaryButtonStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        wrapper: { flexDirection: 'row', marginVertical: 10 },
        button: {
            height: 40,
            width: "100%",
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary,
            borderRadius: 10,
        },
        label: { color: colors.textOnPrimary, fontSize: 16 },
    });
}
