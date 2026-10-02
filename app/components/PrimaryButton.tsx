import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../theme/ThemeContext';


type Props = {
    label: string;
    onPress: () => void;
    icon?: keyof typeof Ionicons.glyphMap;
    disabled?: boolean;
    loading?: boolean;
};

export default function PrimaryButton({ label, onPress, icon, disabled, loading }: Props) {
    const colors = useTheme().colors;
    const isDisabled = disabled || loading;

    return (
        <View style={{ flexDirection: 'row', marginVertical: 10, paddingHorizontal: 40 }}>
            <Pressable
                onPress={onPress}
                disabled={isDisabled}
                style={{
                    height: 40,
                    width: "100%",
                    flexDirection: 'row',
                    gap: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.accent,
                    borderRadius: 10,
                    opacity: isDisabled ? 0.5 : 1,
                }}
            >
                {loading ? (
                    <ActivityIndicator size="small" color={colors.textOnPrimary} />
                ) : (
                    <>
                        {icon && <Ionicons name={icon} size={10} color={colors.textOnPrimary} />}
                        <Text style={{ color: colors.textOnPrimary, fontSize: 16 }}>{label}</Text>
                    </>
                )}
            </Pressable>
        </View>
    )
}
