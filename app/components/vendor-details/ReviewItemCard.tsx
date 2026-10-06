import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme/ThemeContext';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { StarRating } from '../StarsRating';
import { formatRelativeTime } from '../../utils/formatRelativeTime';

type Props = {
    rating: number;
    review: string;
    date: string;
};

const ReviewItemCard = ({ rating, review, date }: Props) => {
    const { colors } = useTheme();
    const styles = useThemedStyles(createReviewItemStyles);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="person-circle-outline" size={26} color={colors.textMuted} />
                <StarRating rating={rating} readOnly size={16} />
                <Text style={styles.date}>{formatRelativeTime(date)}</Text>
            </View>
            <Text style={styles.review}>{review?.trim()}</Text>
        </View>
    )
}

export default ReviewItemCard

function createReviewItemStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        container: { padding: 10, gap: 4, borderBottomWidth: 1, borderBottomColor: colors.border },
        header: { flexDirection: "row", alignItems: "center", gap: 10 },
        date: { color: colors.textSecondary, fontSize: 12 },
        review: { color: colors.textMain, fontSize: 16 },
    });
}
