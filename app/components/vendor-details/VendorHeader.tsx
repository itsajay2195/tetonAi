


import { Image } from "expo-image";
import { View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
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
    const { colors } = useTheme();
    const isMenuActive = activeTab === "menu";
    const { thumbnail, name, cuisine, rating, description, menu } = vendor;

    return (
        <View>
            <View style={{ height: 180 }}>
                <Image source={{ uri: thumbnail }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
            </View>
            <View style={{ padding: 10, gap: 10, backgroundColor: colors.bg, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -25 }}>
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



