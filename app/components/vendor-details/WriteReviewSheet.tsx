import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { BottomSheet } from "../BottomSheet";
import { StarRating } from "../StarsRating";
import PrimaryButton from "../PrimaryButton";
import { useSubmitReview } from "../../api/hooks/useSubmitReview";
import { useTheme } from "../../theme/ThemeContext";
import { useThemedStyles } from "../../hooks/useThemedStyles";

type Props = {
    vendorId: string;
    vendorName: string;
    visible: boolean;
    onClose: () => void;
};

export function WriteReviewSheet({ vendorId, vendorName, visible, onClose }: Props) {
    const styles = useThemedStyles(createWriteReviewStyles);
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
                <View style={styles.content}>
                    <Text style={styles.title}>Rate your visit</Text>
                    <Text style={styles.subtitle}>{vendorName}</Text>
                    <StarRating rating={selectedRating} onRatingChange={setSelectedRating} />
                    <View>
                        <Text style={styles.label}>Your review</Text>
                        <TextInput
                            multiline
                            numberOfLines={10}
                            value={reviewText}
                            onChangeText={setReviewText}
                            style={styles.input}
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

function createWriteReviewStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        content: { padding: 10, gap: 4 },
        title: { color: colors.textMain, fontSize: 20, fontWeight: '700' },
        subtitle: { color: colors.textSecondary, fontSize: 14 },
        label: { color: colors.textSecondary, fontSize: 14 },
        input: { height: 100, width: "100%", borderColor: colors.border, borderWidth: 1, borderRadius: 4, textAlignVertical: "top", color: colors.textMain, padding: 8 },
    });
}
