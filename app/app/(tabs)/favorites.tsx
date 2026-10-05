import { StyleSheet, View, FlatList } from "react-native";
import { useCallback } from "react";
import VendorCard from "../../components/VendorCard";
import { useFavorites } from "../../api/hooks/useFavorites";
import { Vendor } from "../../types/vendor";
import { Header } from "../../components/Header";
import { useTheme } from "../../theme/ThemeContext";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { useFocusEffect } from "expo-router/build/react-navigation";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";
import { EmptyState } from "../../components/EmptyState";

export default function Favorites() {
    const styles = useThemedStyles(createFavoritesStyles);
    const { data, isLoading, error, refetch, isRefetching } = useFavorites();
    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    const renderItem = useCallback(({ item }: { item: Vendor }) => (
        <VendorCard vendor={item} />
    ), []);

    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState message="Couldn't load your favorites. Please try again." onRetry={refetch} />;

    return (
        <View style={styles.container}>
            <Header title="Favorites" />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item: Vendor) => item.id}
                numColumns={2}
                refreshing={isRefetching}
                onRefresh={refetch}
                contentContainerStyle={styles.content}
                ListEmptyComponent={<EmptyState text="No favorites yet. Tap the heart on a vendor to save it here." />}
            />
        </View>
    );
}

function createFavoritesStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.bg },
        content: { padding: 10 },
    });
}
