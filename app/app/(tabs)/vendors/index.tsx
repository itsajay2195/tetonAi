import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function VendorsList() {
    return (
        <View>
            <Text>Vendors</Text>
            <Link href="/vendors/5">
                <Text>Go to vendor test vendor</Text>
            </Link>
        </View>
    );
}
