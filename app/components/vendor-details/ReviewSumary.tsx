import { View, Text } from 'react-native';
import { StarRating } from '../StarsRating';
import { useTheme } from '../../theme/ThemeContext';
import { tokens } from '../../theme/colors';

type Props = {
    reviews: { rating: number }[];
};

export function ReviewsSummary({ reviews }: Props) {
    const { colors } = useTheme();
    const total = reviews.length;
    const average = total > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;
    const distribution = [5, 4, 3, 2, 1].map((star) => {
        const count = reviews.filter((r) => r.rating === star).length;
        return { star, count, percent: total > 0 ? (count / total) * 100 : 0 };
    });

    return (
        <View style={{ flexDirection: 'row', gap: 20, paddingVertical: 10 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <Text style={{ fontSize: 36, fontWeight: '700', color: colors.textMain }}>{average.toFixed(1)}</Text>
                <StarRating rating={Math.round(average)} readOnly size={16} />
                <Text style={{ fontSize: 12, color: colors.textSecondary }}>{total} reviews</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', gap: 4 }}>
                {distribution.map(({ star, count, percent }) => (
                    <View key={star} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Text style={{ fontSize: 12, color: colors.textSecondary, width: 12 }}>{star}</Text>
                        <View style={{ flex: 1, height: 6, borderRadius: tokens.borderRadius.full, backgroundColor: colors.surface }}>
                            <View style={{ width: `${percent}%`, height: '100%', borderRadius: tokens.borderRadius.full, backgroundColor: colors.primary }} />
                        </View>
                        <Text style={{ fontSize: 12, color: colors.textSecondary, width: 20 }}>{count}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
