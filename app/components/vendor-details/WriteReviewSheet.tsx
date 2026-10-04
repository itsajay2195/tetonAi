import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";
import { BottomSheet } from "../BottomSheet";
import { StarRating } from "../StarsRating";
import PrimaryButton from "../PrimaryButton";
import { useSubmitReview } from "../../api/hooks/useSubmitReview";
import { useTheme } from "../../theme/ThemeContext";

type Props = {
    vendorId: string;
    vendorName: string;
    visible: boolean;
    onClose: () => void;
};

export function WriteReviewSheet({ vendorId, vendorName, visible, onClose }: Props) {
    const { colors } = useTheme();
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const { mutate: submitReview, isPending: isSubmitting } = useSubmitReview();

    const handleClose = () => {
        setSelectedRating(0);
        setReviewText("");
        onClose();
    };

    const handleSubmit = () => {
        submitReview(
            { vendorId, rating: selectedRating, comment: reviewText },
            {
                onSuccess: () => {
                    setSelectedRating(0);
                    setReviewText("");
                    onClose();
                },
            }
        );
    };

    return (
        <BottomSheet visible={visible} onClose={handleClose}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <View style={{ padding: 10, gap: 4 }}>
                    <Text style={{ color: colors.textMain, fontSize: 20, fontWeight: '700' }}>Rate your visit</Text>
                    <Text style={{ color: colors.textSecondary, fontSize: 14 }}>{vendorName}</Text>
                    <StarRating rating={selectedRating} onRatingChange={setSelectedRating} />
                    <View>
                        <Text style={{ color: colors.textSecondary, fontSize: 14 }}>Your review</Text>
                        <TextInput
                            multiline
                            numberOfLines={10}
                            value={reviewText}
                            onChangeText={setReviewText}
                            style={{ height: 100, width: "100%", borderColor: colors.border, borderWidth: 1, borderRadius: 4, textAlignVertical: "top", color: colors.textMain, padding: 8 }}
                        />
                    </View>
                </View>
                <PrimaryButton
                    label="Submit review"
                    onPress={handleSubmit}
                    loading={isSubmitting}
                    disabled={selectedRating === 0 || reviewText.trim().length === 0 || isSubmitting}
                />
            </KeyboardAvoidingView>
        </BottomSheet>
    );
}
