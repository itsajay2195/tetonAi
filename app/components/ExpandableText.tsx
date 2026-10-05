import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../hooks/useThemedStyles';

function ExpandableText({ text, lines = 3 }: { text: string; lines?: number }) {
    const styles = useThemedStyles(createExpandableTextStyles);
    const [expanded, setExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const [measured, setMeasured] = useState(false);

    return (
        <View>
            <Text
                style={styles.text}
                numberOfLines={measured && !expanded ? lines : undefined}
                onTextLayout={(e) => {
                    if (!measured) {
                        setIsTruncated(e.nativeEvent.lines.length > lines);
                        setMeasured(true);
                    }
                }}
            >
                {text}
            </Text>
            {isTruncated && (
                <Pressable onPress={() => setExpanded((prev) => !prev)}>
                    <Text style={styles.toggle}>
                        {expanded ? "Show less" : "Read more"}
                    </Text>
                </Pressable>
            )}
        </View>
    );
}

export default ExpandableText

function createExpandableTextStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        text: { fontSize: 14, color: colors.textSecondary },
        toggle: { color: colors.primary, fontWeight: "600", marginTop: 4 },
    });
}
