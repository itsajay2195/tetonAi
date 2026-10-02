import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";


export default function ThemeToggleButton() {
    const { theme, toggleTheme, colors } = useTheme();
    return (
        <Pressable onPress={toggleTheme} hitSlop={8}>
            <Ionicons name={theme === "dark" ? "moon" : "sunny"} size={22} color={colors.textMain} />
        </Pressable>
    );
}

