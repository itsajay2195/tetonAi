import { Link } from "expo-router";
import { Text, View } from "react-native";
import { apiFetch } from "../../../api/config/client";
import { useQuery } from "@tanstack/react-query";

export default function VendorsList() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["vendors"],
        queryFn: () => apiFetch("/vendors?limit=1"),
    });

    if (isLoading) return <View><Text>Loading...</Text></View>;
    if (error) return <View><Text>Error: {error.message}</Text></View>;

    return (
        <View>
            <Text>{JSON.stringify(data, null, 2)}</Text>
        </View>
    );
}
