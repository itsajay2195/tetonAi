import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, ActivityIndicator, FlatList, Pressable, ViewStyle } from "react-native";
import { Header } from "../../../components/Header";
import { useTheme } from "../../../theme/ThemeContext";
import { useThemedStyles } from "../../../hooks/useThemedStyles";
import { useVendor } from "../../../api/hooks/useVendor";
import { Image } from "expo-image";
import MenuItemCard from "../../../components/vendor-details/MenuItemCard";
import RestaurantInfo from "../../../components/vendor-details/RestaurantInfo";
import { useCallback, useMemo, useState } from "react";
import MenuReviewsTabs from "../../../components/vendor-details/MenuReviewsTabs";

export default function VendorDetails() {
    const { id }: { id: string } = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState<"menu" | "reviews">("menu");
    const isMenuActive = activeTab === "menu";
    const colors = useTheme().colors;
    const styles = useThemedStyles((colors) => createVendorDetialsStyles(colors));
    const { data, isLoading, error } = useVendor(id);
    const { name, description, rating, thumbnail, cuisine } = data || { name: "", description: "", rating: 0, thumbnail: "", cuisine: "" };
    const sample = data?.menu[0];
    const renderItem = useCallback(({ item }: { item: typeof sample }) => (
        <MenuItemCard item={item} />
    ), []);
    const keyExtractor = useCallback((item: typeof sample) => item.id, []);
    const toggleTab = useCallback((tab: "menu" | "reviews") => {
        setActiveTab(tab);
    }, []);
    const menuTabStyle = useMemo((): ViewStyle => ({
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isMenuActive ? colors.card : "transparent",
        paddingVertical: 4,
        borderRadius: 10,
    }), [isMenuActive, colors.card]);

    const reviewsTabStyle = useMemo((): ViewStyle => ({
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: !isMenuActive ? colors.card : "transparent",
        paddingVertical: 4,
        borderRadius: 10,
    }), [isMenuActive, colors.card]);

    const handleMenuPress = useCallback(() => {
        toggleTab("menu");
    }, [toggleTab]);

    const handleReviewsPress = useCallback(() => {
        toggleTab("reviews");
    }, [toggleTab]);

    const menuAndReviews = useMemo(() => {
        if (activeTab === "menu") {
            return data?.menu || [];
        } else {
            return data?.reviews || [];
        }
    }, [activeTab, data]);
    if (isLoading) return <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}><ActivityIndicator size="small" /></View>;
    if (error) return <View><Text>Error: {error?.message}</Text></View>;
    if (!data) return <View><Text>No data found for vendor with ID: {id}</Text></View>;

    return (
        <View style={styles.container}>
            <Header title="Vendor Details" variant="floating" />
            <View >
                <View style={{ height: 180 }}>
                    <Image source={{ uri: thumbnail }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                </View>
            </View>

            <View style={{ flex: 1, padding: 10, backgroundColor: colors.bg, gap: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -25 }}>
                <RestaurantInfo cuisine={cuisine} name={name} rating={rating} description={description} menuLength={data?.menu.length || 0} />
                <MenuReviewsTabs handleMenuPress={handleMenuPress} handleReviewsPress={handleReviewsPress} menuTabStyle={menuTabStyle} reviewsTabStyle={reviewsTabStyle} />
                <FlatList
                    data={menuAndReviews}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    ListEmptyComponent={() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                            <Text style={{ color: colors.textSecondary }}>No {activeTab} available.</Text>
                        </View>
                    )}
                />
            </View>

            <View>

            </View>
        </View>

    );
}

function createVendorDetialsStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        container: {
            flex: 1,
            gap: 10,
            backgroundColor: colors.bg,
        },

    });
}