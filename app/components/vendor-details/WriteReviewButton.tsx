import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../theme/ThemeContext';

const WriteReviewButton = () => {
    const colors = useTheme().colors;
    return (
        <View style={{ flexDirection: 'row', flex: 1, marginVertical: 10, paddingHorizontal: 40 }}>
            <Pressable onPress={() => { }} style={{ height: 40, width: "100%", flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.accent, borderRadius: 10, }}>
                <Ionicons name="pencil" size={10} color={colors.textOnPrimary} />
                <Text style={{ color: colors.textOnPrimary, fontSize: 16 }}>Write a review</Text>
            </Pressable>
        </View>
    )
}

export default WriteReviewButton
