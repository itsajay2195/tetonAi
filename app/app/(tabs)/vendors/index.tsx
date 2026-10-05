import { Text, View, FlatList, Platform, StyleSheet, ActivityIndicator } from "react-native";
import { useCallback, useState } from "react";
import VendorCard from "../../../components/VendorCard";
import { useVendors } from "../../../api/hooks/useVendors";
import { Vendor } from "../../../types/vendor";
import { Header } from "../../../components/Header";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import { useSearch } from "../../../api/hooks/useSearch";
import { useTheme } from "../../../theme/ThemeContext";
import { useThemedStyles } from "../../../hooks/useThemedStyles";
import { LoadingState } from "../../../components/LoadingState";
import { ErrorState } from "../../../components/ErrorState";

export default function VendorsList() {
    const isAndroid = Platform.OS === 'android';
    const styles = useThemedStyles(createVendorsListStyles);
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
    const listEmptyComponent = useCallback(() => {
        if (isFetchingNextPage) {
            return <View style={styles.footer}><ActivityIndicator /></View>;
        }
        return null;
    }, [isFetchingNextPage, styles])
    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState message="Couldn't load vendors. Please try again." onRetry={refetch} />;
    const dataToRender: Vendor[] = isSearching ? searchResults : data;
    const onEndReachedHandler = isSearching ? undefined : onEndReached;
    const onRefreshHandler = isSearching ? undefined : refetch;
    const noResultsFound = isSearching && !searchLoading && searchResults?.length === 0;
    const isSearchingAndLoading = isSearching && searchLoading;
    return (
        <View style={styles.container}>
            <Header showSearch={true} searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
            {noResultsFound ? (
                <View style={styles.centeredMessage}>
                    <Text>No results found for "{searchQuery}"</Text>
                </View>
            ) : null}
            {searchError ? (
                <View style={styles.centeredMessage}>
                    <Text>Error: {searchError?.message}</Text>
                </View>
            ) : null}
            {isSearchingAndLoading ? (
                <View style={styles.centeredMessage}>
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
                ListFooterComponent={listEmptyComponent}
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


function createVendorsListStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.bg },
        contentContainerStyle: { paddingBottom: 20, backgroundColor: colors.bg },
        footer: { justifyContent: 'center', alignItems: 'center' },
        centeredMessage: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    });
}
