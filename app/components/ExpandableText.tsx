import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../theme/ThemeContext';

function ExpandableText({ text, lines = 3 }: { text: string; lines?: number }) {
    const { colors } = useTheme();
    const [expanded, setExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const [measured, setMeasured] = useState(false);

    return (
        <View>
            <Text
                style={{ fontSize: 14, color: colors.textSecondary }}
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
                    <Text style={{ color: colors.primary, fontWeight: "600", marginTop: 4 }}>
                        {expanded ? "Show less" : "Read more"}
                    </Text>
                </Pressable>
            )}
        </View>
    );
}

export default ExpandableText
