import { Stack } from "expo-router";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, useTheme } from "../theme/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SnackbarProvider, useSnackbar } from "../theme/snackbarContext";
import { NoNetworkBanner } from "../components/NoNetworkBanner";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { ReactNode, useState } from "react";

function ThemedStack() {
    const { colors } = useTheme();
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.bg },
            }}
        />
    );
}

function QueryProvider({ children }: { children: ReactNode }) {
    const { showError } = useSnackbar();
    const [queryClient] = useState(() => new QueryClient({
        queryCache: new QueryCache({
            onError: (error) => showError(error instanceof Error ? error.message : "Something went wrong"),
        }),
        mutationCache: new MutationCache({
            onError: (error) => showError(error instanceof Error ? error.message : "Something went wrong"),
        }),
    }));

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <ErrorBoundary>
                    <SnackbarProvider>
                        <QueryProvider>
                            <NoNetworkBanner />
                            <ThemedStack />
                        </QueryProvider>
                    </SnackbarProvider>
                </ErrorBoundary>
            </ThemeProvider>
        </SafeAreaProvider>

    );
}
