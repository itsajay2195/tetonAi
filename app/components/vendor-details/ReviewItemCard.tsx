import { Text, View } from 'react-native'
import { useTheme } from '../../theme/ThemeContext';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { StarRating } from '../StarsRating';
import { formatRelativeTime } from '../../docs/dateUtils';


type Props = {
    rating: number;
    review: string;
    date: string;
};
const ReviewItemCard = ({ rating, review, date }: Props) => {
    const colors = useTheme().colors;
    return (
        <View style={{ padding: 10, gap: 4, borderBottomWidth: 1, borderBottomColor: colors.border }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Ionicons name="person-circle-outline" size={26} color={colors.textMuted} />
                <StarRating rating={rating} readOnly size={16} />
                <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{formatRelativeTime(date)}</Text>
            </View>
            <Text style={{ color: colors.textMain, fontSize: 16 }}>{review?.trim()}</Text>
        </View>
    )
}

export default ReviewItemCard
