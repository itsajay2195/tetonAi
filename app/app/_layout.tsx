import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "../theme/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();
export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <Stack screenOptions={{ headerShown: false }} />
                </QueryClientProvider>
            </ThemeProvider>
        </SafeAreaProvider>

    );
}
