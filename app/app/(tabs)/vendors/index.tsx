import { Text, View, FlatList, Platform, StyleSheet } from "react-native";
import { useCallback, useState } from "react";
import VendorCard from "../../../components/VendorCard";
import { useVendors } from "../../../api/hooks/useVendors";
import { Vendor } from "../../../types/vendor";
import { Header } from "../../../components/Header";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import { useSearch } from "../../../api/hooks/useSearch";
import { useTheme } from "../../../theme/ThemeContext";
import { useThemedStyles } from "../../../hooks/useThemedStyles";


export default function VendorsList() {
    const isAndroid = Platform.OS === 'android';
    const styles = useThemedStyles(createHeaderStyles);
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedQuery = useDebouncedValue(searchQuery, 400);
    const isSearching = debouncedQuery.length > 0;
    const { data: searchResults, error: searchError, isLoading: searchLoading } = useSearch(debouncedQuery);
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
    if (error) return <View><Text>Error: {error?.message}</Text></View>;
    const dataToRender: Vendor[] = isSearching ? searchResults : data;
    const onEndReachedHandler = isSearching ? undefined : onEndReached;
    const onRefreshHandler = isSearching ? undefined : refetch;
    const noResultsFound = isSearching && !searchLoading && searchResults?.length === 0;
    const isSearchingAndLoading = isSearching && searchLoading;
    return (
        <View style={{ flex: 1 }}>
            <Header showSearch={true} searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
            {noResultsFound ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>No results found for "{searchQuery}"</Text>
                </View>
            ) : null}
            {searchError ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Error: {searchError?.message}</Text>
                </View>
            ) : null}
            {isSearchingAndLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Searching...</Text>
                </View>
            ) : null}
            <FlatList
                data={dataToRender}
                renderItem={renderItem}
                keyExtractor={(item: Vendor) => item.id}
                numColumns={2}
                onEndReached={onEndReachedHandler}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isFetchingNextPage ? <Text>Loading more...</Text> : null}
                refreshing={isRefetching}
                onRefresh={onRefreshHandler}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                removeClippedSubviews={isAndroid}
                windowSize={5}
                contentContainerStyle={styles.contentContainerStyle}
            />
        </View>
    );
}


function createHeaderStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bg,
        },
        contentContainerStyle: {
            paddingBottom: 20,
            backgroundColor: colors.bg,
        },
    });
}