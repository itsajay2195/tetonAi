import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View, FlatList, Pressable } from "react-native";
import { Header } from "../../../components/Header";
import { useTheme } from "../../../theme/ThemeContext";
import { useVendor } from "../../../api/hooks/useVendor";
import MenuItemCard from "../../../components/vendor-details/MenuItemCard";
import { useCallback, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import ReviewItemCard from "../../../components/vendor-details/ReviewItemCard";
import { useToggleFavorite } from "../../../api/hooks/useToggleFavorite";
import { MenuItem, Review } from "../../../types/vendor";
import { WriteReviewSheet } from "../../../components/vendor-details/WriteReviewSheet";
import { LoadingState } from "../../../components/LoadingState";
import { ErrorState } from "../../../components/ErrorState";
import { VendorHeader } from "../../../components/vendor-details/VendorHeader";
import { EmptyState } from "../../../components/EmptyState";
import { useThemedStyles } from "../../../hooks/useThemedStyles";

export default function VendorDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState<"menu" | "reviews">("menu");
    const [showReviewSheet, setShowReviewSheet] = useState(false);
    const [menuFilter, setMenuFilter] = useState<"all" | "spicy" | "vegan">("all");
    const isMenuActive = activeTab === "menu";
    const { colors } = useTheme();
    const { mutate: toggleFavorite } = useToggleFavorite(id);
    const { data, isLoading, error, refetch } = useVendor(id);
    const styles = useThemedStyles(createVendorDetailsStyles);
    const menuRenderItem = useCallback(({ item }: { item: MenuItem }) => (
        <MenuItemCard item={item} />
    ), []);
    const reviewsRenderItem = useCallback(({ item }: { item: Review }) => (
        <ReviewItemCard rating={item.rating} review={item.comment} date={item.date} />
    ), []);
    const menuKeyExtractor = useCallback((item: MenuItem) => item.id, []);
    const reviewsKeyExtractor = useCallback((item: Review) => item.id, []);

    const handleToggleFavorite = useCallback(() => {
        toggleFavorite(!data?.isFavorite);
    }, [toggleFavorite, data?.isFavorite]);

    const filteredMenu = useMemo(() => {
        const menu = data?.menu ?? [];
        if (menuFilter === "all") return menu;
        return menu.filter((item) => (menuFilter === "spicy" ? item.spicy : item.vegan));
    }, [data, menuFilter]);

    const sortedReviews = useMemo(() => {
        const reviews = data?.reviews ?? [];
        return [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [data]);

    if (isLoading) return <LoadingState />;
    if (error) {
        console.error("Failed to load vendor:", error);
        return <ErrorState message="Couldn't load this vendor. Please try again." onRetry={refetch} />;
    }
    if (!data) return <ErrorState message="This vendor couldn't be found." onRetry={refetch} />;

    const { name, isFavorite } = data;

    const vendorHeader = (
        <VendorHeader
            vendor={data}
            reviews={sortedReviews}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            menuFilter={menuFilter}
            onMenuFilterChange={setMenuFilter}
            onWriteReview={() => setShowReviewSheet(true)}
        />
    );


    return (
        <View style={{ flex: 1, backgroundColor: colors.bg }}>
            <Header
                title="Vendor Details"
                variant="floating"
                rightChild={
                    <Pressable
                        onPress={handleToggleFavorite}
                        accessibilityRole="button"
                        accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        accessibilityState={{ selected: isFavorite }}
                        hitSlop={8}
                        style={styles.favoriteButton}
                    >
                        <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={18} color={colors.overlayButtonIcon} />
                    </Pressable>

                }
            />
            {isMenuActive ? (
                <FlatList
                    data={filteredMenu}
                    renderItem={menuRenderItem}
                    keyExtractor={menuKeyExtractor}
                    ListHeaderComponent={vendorHeader}
                    ListEmptyComponent={<EmptyState text="No menu items available." />}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            ) : (
                <FlatList
                    data={sortedReviews}
                    renderItem={reviewsRenderItem}
                    keyExtractor={reviewsKeyExtractor}
                    ListHeaderComponent={vendorHeader}
                    ListEmptyComponent={<EmptyState text="No reviews yet. Be the first!" />}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
            <WriteReviewSheet vendorId={id} vendorName={name} visible={showReviewSheet} onClose={() => setShowReviewSheet(false)} />
        </View>
    );
}


function createVendorDetailsStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        favoriteButton: {
            height: 44,
            width: 44,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.overlayButtonBg,
            borderRadius: 22,
        },
    });
}
