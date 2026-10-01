import { StyleSheet, Text, View, Pressable } from 'react-native'
import { memo, useMemo } from 'react'
import { useTheme } from '../theme/ThemeContext';
import { Link } from 'expo-router';
import { tokens } from '../theme/colors';
import { Vendor } from '../types/vendor';
import { Image } from "expo-image";

const VendorCard = ({ vendor }: { vendor: Vendor }) => {
    const { colors } = useTheme();
    const styles = useMemo(() => createStyles(colors), [colors]);
    return (
        <View style={styles.container}>
            <Link href={`/vendors/${vendor.id}`} asChild>
                <Pressable style={styles.card}>
                    <Image source={{ uri: vendor.thumbnail }} style={styles.image} contentFit="cover" transition={200} cachePolicy="memory-disk" />
                    <Text style={styles.name}>{vendor.name}</Text>
                    <Text style={styles.secondary}>{vendor.cuisine}</Text>
                    <Text style={styles.secondary}>{vendor.city}</Text>
                    <Text style={styles.secondary}>Rating: {vendor.rating}</Text>
                    <Text style={styles.secondary}>Price Level: {vendor.priceLevel}</Text>
                </Pressable>
            </Link>
        </View>
    )
}

export default memo(VendorCard)


function createStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        container: { width: '48%', margin: '1%' },
        card: {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.borderRadius.md,
            padding: tokens.spacing.md,
        },
        name: {
            color: colors.textMain,
            fontSize: tokens.fontSize.md,
            fontWeight: "600",
        },
        secondary: {
            color: colors.textSecondary,
            fontSize: tokens.fontSize.sm,
        },
        image: {
            width: '100%',
            height: 150,
            borderRadius: tokens.borderRadius.sm,
            marginBottom: tokens.spacing.sm,
        },
    });
}