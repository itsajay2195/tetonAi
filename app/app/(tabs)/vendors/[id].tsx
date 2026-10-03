import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, ActivityIndicator, FlatList, Pressable, ViewStyle, TextInput } from "react-native";
import { Header } from "../../../components/Header";
import { useTheme } from "../../../theme/ThemeContext";
import { useThemedStyles } from "../../../hooks/useThemedStyles";
import { useVendor } from "../../../api/hooks/useVendor";
import { Image } from "expo-image";
import MenuItemCard from "../../../components/vendor-details/MenuItemCard";
import RestaurantInfo from "../../../components/vendor-details/RestaurantInfo";
import { useCallback, useMemo, useState } from "react";
import MenuReviewsTabs from "../../../components/vendor-details/MenuReviewsTabs";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheet } from "../../../components/BottomSheet";
import { StarRating } from "../../../components/StarsRating";
import PrimaryButton from "../../../components/PrimaryButton";
import { useSubmitReview } from "../../../api/hooks/useSubmitReview";
import ReviewItemCard from "../../../components/vendor-details/ReviewItemCard";
import { ReviewsSummary } from "../../../components/vendor-details/ReviewSumary";
import { useToggleFavorite } from "../../../api/hooks/useToggleFavorite";

export default function VendorDetails() {
    const { id }: { id: string } = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState<"menu" | "reviews">("menu");
    const [showReviewSheet, setShowReviewSheet] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const { mutate: submitReview, isPending: isSubmitting } = useSubmitReview();
    const isMenuActive = activeTab === "menu";
    const colors = useTheme().colors;
    const styles = useThemedStyles((colors) => createVendorDetialsStyles(colors));
    const { mutate: toggleFavorite } = useToggleFavorite(id);
    const { data, isLoading, error } = useVendor(id);
    const { name, description, rating, thumbnail, cuisine, reviews } = data || { name: "", description: "", rating: 0, thumbnail: "", cuisine: "" };
    const sample = data?.menu[0];
    const menuRenderItem = useCallback(({ item }: { item: typeof sample }) => (
        <MenuItemCard item={item} />
    ), []);
    const reviewsRenderItem = useCallback(({ item }: { item: typeof sample }) => (
        <ReviewItemCard rating={item?.rating} review={item?.comment} date={item?.date} />
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
    const handleSubmitReview = () => {
        submitReview(
            { vendorId: id, rating: selectedRating, comment: reviewText },
            {
                onSuccess: () => {
                    setShowReviewSheet(false);
                    setSelectedRating(0);
                    setReviewText("");
                },
            }
        );
    };
    const handleToggleFavorite = useCallback(() => {
        toggleFavorite(!data?.isFavorite);
    }, [toggleFavorite, data?.isFavorite]);
    const isFavorite = data?.isFavorite ?? false;
    if (isLoading) return <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}><ActivityIndicator size="small" /></View>;
    if (error) return <View><Text>Error: {error?.message}</Text></View>;
    if (!data) return <View><Text>No data found for vendor with ID: {id}</Text></View>;

    return (
        <View style={styles.container}>
            <Header title="Vendor Details" variant="floating"
                rightChild={<Pressable onPress={handleToggleFavorite} style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.overlayButtonBg, borderRadius: 20, }}>
                    <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={18} color={colors.overlayButtonIcon} />
                </Pressable>}
            />
            <View >
                <View style={{ height: 180 }}>
                    <Image source={{ uri: thumbnail }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                </View>
            </View>

            <View style={{ flex: 1, padding: 10, backgroundColor: colors.bg, gap: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -25 }}>
                <RestaurantInfo cuisine={cuisine} name={name} rating={rating} description={description} menuLength={data?.menu.length || 0} reviewsCount={reviews.length} />
                <MenuReviewsTabs handleMenuPress={handleMenuPress} handleReviewsPress={handleReviewsPress} menuTabStyle={menuTabStyle} reviewsTabStyle={reviewsTabStyle} reviewsCount={reviews.length} isMenuActive={isMenuActive} />
                {!isMenuActive && data?.reviews && data.reviews.length > 0 && (
                    <ReviewsSummary reviews={data.reviews} averageRating={rating} />
                )}

                {!isMenuActive && (
                    <PrimaryButton label="Write a Review" icon="pencil" onPress={() => setShowReviewSheet(true)} />
                )}


                <FlatList
                    data={menuAndReviews}
                    renderItem={activeTab === 'menu' ? menuRenderItem : reviewsRenderItem}
                    keyExtractor={keyExtractor}
                    ListEmptyComponent={() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                            <Text style={{ color: colors.textSecondary }}>
                                {activeTab === 'reviews' ? 'No reviews yet. Be the first!' : 'No menu items available.'}
                            </Text>
                        </View>
                    )}
                />
            </View>

            <View>

            </View>
            <BottomSheet visible={showReviewSheet} onClose={() => {
                setShowReviewSheet(false)
                setSelectedRating(0)
            }} >
                <View style={{ flex: 1, justifyContent: 'center', padding: 10, gap: 4 }}>
                    {/* head */}
                    <Text style={{ color: colors.textMain, fontSize: 20, fontWeight: '700' }}>Rate your visit</Text>
                    <Text style={{ color: colors.textSecondary, fontSize: 10, }}>Rate your visit</Text>
                    {/* stars */}
                    <StarRating rating={selectedRating} onRatingChange={setSelectedRating} />
                    {/* form fields */}
                    {/* submit button */}
                    <View>
                        <Text style={{ color: colors.textSecondary, fontSize: 14, }}>Your review</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={10}
                            value={reviewText}
                            onChangeText={setReviewText}
                            style={{ height: 100, width: "100%", borderColor: colors.border, borderWidth: 1, borderRadius: 4, textAlignVertical: "top" }}
                        />
                    </View>
                </View>
                <PrimaryButton label="Submit review" onPress={handleSubmitReview} loading={false} disabled={selectedRating === 0 || reviewText.trim().length === 0 || isSubmitting} />
                {/* review form content goes here */}
            </BottomSheet>
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