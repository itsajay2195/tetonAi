import { Text, View, FlatList } from "react-native";
import { useCallback } from "react";
import VendorCard from "../../components/VendorCard";
import { useFavorites } from "../../api/hooks/useFavorites";
import { Vendor } from "../../types/vendor";
import { Header } from "../../components/Header";
import { useTheme } from "../../theme/ThemeContext";
import { useFocusEffect } from "expo-router/build/react-navigation";

export default function Favorites() {
    const { colors } = useTheme();
    const { data, isLoading, error, refetch, isRefetching } = useFavorites();
    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    const renderItem = useCallback(({ item }: { item: Vendor }) => (
        <VendorCard vendor={item} />
    ), []);

    if (isLoading) return <View><Text>Loading...</Text></View>;
    if (error) return <View><Text>Error: {error.message}</Text></View>;

    return (
        <View style={{ flex: 1, backgroundColor: colors.bg }}>
            <Header title="Favorites" />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item: Vendor) => item.id}
                numColumns={2}
                refreshing={isRefetching}
                onRefresh={refetch}
                contentContainerStyle={{ padding: 10 }}
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 }}>
                        <Text style={{ color: colors.textSecondary }}>No favorites yet. Tap the heart on a vendor to save it here.</Text>
                    </View>
                )}
            />
        </View>
    );
}