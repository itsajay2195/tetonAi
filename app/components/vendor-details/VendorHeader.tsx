import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import MenuReviewsTabs from "./MenuReviewsTabs";
import RestaurantInfo from "./RestaurantInfo";
import { MenuFilterChips } from "./MenuFilterChips";
import PrimaryButton from "../PrimaryButton";
import { ReviewsSummary } from "./ReviewSumary";
import { Review, VendorDetail } from "../../types/vendor";

type Props = {
    vendor: VendorDetail;
    reviews: Review[];
    activeTab: "menu" | "reviews";
    onTabChange: (tab: "menu" | "reviews") => void;
    menuFilter: "all" | "spicy" | "vegan";
    onMenuFilterChange: (filter: "all" | "spicy" | "vegan") => void;
    onWriteReview: () => void;
};

export function VendorHeader({ vendor, reviews, activeTab, onTabChange, menuFilter, onMenuFilterChange, onWriteReview }: Props) {
    const styles = useThemedStyles(createVendorHeaderStyles);
    const isMenuActive = activeTab === "menu";
    const { thumbnail, name, cuisine, rating, description, menu } = vendor;

    return (
        <View>
            <View style={styles.imageWrapper}>
                <Image source={{ uri: thumbnail }} style={styles.image} contentFit="cover" />
            </View>
            <View style={styles.body}>
                <RestaurantInfo cuisine={cuisine} name={name} rating={rating} description={description} menuLength={menu.length} reviewsCount={reviews.length} />
                <MenuReviewsTabs
                    handleMenuPress={() => onTabChange("menu")}
                    handleReviewsPress={() => onTabChange("reviews")}
                    reviewsCount={reviews.length}
                    isMenuActive={isMenuActive}
                />
                {isMenuActive && <MenuFilterChips selected={menuFilter} onSelect={onMenuFilterChange} />}
                {!isMenuActive && reviews.length > 0 && <ReviewsSummary reviews={reviews} />}
                {!isMenuActive && <PrimaryButton label="Write a Review" icon="pencil" onPress={onWriteReview} />}
            </View>
        </View>
    );
}

function createVendorHeaderStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        imageWrapper: { height: 180 },
        image: { width: "100%", height: "100%" },
        body: { padding: 10, gap: 10, backgroundColor: colors.bg, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -25 },
    });
}
