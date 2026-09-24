import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function VendorDetails() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>Vendor {id}</Text>
        </View>
    );
}
