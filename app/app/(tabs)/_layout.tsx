import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="vendors" options={{ title: "Vendors" }} />
            <Tabs.Screen name="favorites" options={{ title: "Favorites" }} />
            <Tabs.Screen name="about" options={{ title: "About" }} />
        </Tabs>
    );
}
