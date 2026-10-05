import { View, Text, StyleSheet } from 'react-native';
import { StarRating } from '../StarsRating';
import { useTheme } from '../../theme/ThemeContext';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { tokens } from '../../theme/colors';

type Props = {
    reviews: { rating: number }[];
};

export function ReviewsSummary({ reviews }: Props) {
    const styles = useThemedStyles(createReviewsSummaryStyles);
    const total = reviews.length;
    const average = total > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;
    const distribution = [5, 4, 3, 2, 1].map((star) => {
        const count = reviews.filter((r) => r.rating === star).length;
        return { star, count, percent: total > 0 ? (count / total) * 100 : 0 };
    });

    return (
        <View style={styles.container}>
            <View style={styles.summary}>
                <Text style={styles.average}>{average.toFixed(1)}</Text>
                <StarRating rating={Math.round(average)} readOnly size={16} />
                <Text style={styles.totalLabel}>{total} reviews</Text>
            </View>
            <View style={styles.bars}>
                {distribution.map(({ star, count, percent }) => (
                    <View key={star} style={styles.barRow}>
                        <Text style={styles.starLabel}>{star}</Text>
                        <View style={styles.barTrack}>
                            <View style={[styles.barFill, { width: `${percent}%` }]} />
                        </View>
                        <Text style={styles.countLabel}>{count}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

function createReviewsSummaryStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        container: { flexDirection: 'row', gap: 20, paddingVertical: 10 },
        summary: { alignItems: 'center', justifyContent: 'center', gap: 4 },
        average: { fontSize: 36, fontWeight: '700', color: colors.textMain },
        totalLabel: { fontSize: 12, color: colors.textSecondary },
        bars: { flex: 1, justifyContent: 'center', gap: 4 },
        barRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
        starLabel: { fontSize: 12, color: colors.textSecondary, width: 12 },
        barTrack: { flex: 1, height: 6, borderRadius: tokens.borderRadius.full, backgroundColor: colors.surface },
        barFill: { height: '100%', borderRadius: tokens.borderRadius.full, backgroundColor: colors.primary },
        countLabel: { fontSize: 12, color: colors.textSecondary, width: 20 },
    });
}
