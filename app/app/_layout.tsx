import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "../theme/ThemeContext";
const queryClient = new QueryClient();
export default function RootLayout() {
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <Stack />
            </QueryClientProvider>
        </ThemeProvider>

    );
}
