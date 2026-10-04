import { View, Text } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { useTheme } from "../theme/ThemeContext";

type Props = {
    message?: string;
    onRetry: () => void;
};

export function ErrorState({ message = "Something went wrong.", onRetry }: Props) {
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Text style={{ color: colors.textMain, fontSize: 16, textAlign: "center", marginBottom: 16 }}>{message}</Text>
            <View style={{ width: "80%" }}>
                <PrimaryButton label="Retry" onPress={onRetry} />
            </View>
        </View>
    );
}
