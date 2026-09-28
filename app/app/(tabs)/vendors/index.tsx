import { Text, View, FlatList, Platform } from "react-native";
import { useCallback } from "react";
import VendorCard from "../../../components/VendorCard";
import { useVendors } from "../../../api/hooks/useVendors";
import { Vendor } from "../../../types/vendor";

export default function VendorsList() {
    const isAndroid = Platform.OS === 'android';
    const { data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
        isRefetching, } = useVendors()
    const renderItem = useCallback(({ item }: { item: Vendor }) => (
        <VendorCard vendor={item} />
    ), []);
    const onEndReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
    if (isLoading) return <View><Text>Loading...</Text></View>;
    if (error) return <View><Text>Error: {error.message}</Text></View>;
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item: Vendor) => item.id}
                numColumns={2}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isFetchingNextPage ? <Text>Loading more...</Text> : null}
                refreshing={isRefetching}
                onRefresh={refetch}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                removeClippedSubviews={isAndroid}
                windowSize={5}
                contentContainerStyle={{ padding: 10, }}
            />
        </View>
    );
}
