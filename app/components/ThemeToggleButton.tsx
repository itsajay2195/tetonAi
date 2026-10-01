import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";


type Props = {
    isEnabled?: boolean;
    searchQuery?: string;
    toggleSwitch?: () => void;
};


const ThemeToggleButton = ({ isEnabled, toggleSwitch }: Props) => {
    const { theme, toggleTheme, colors } = useTheme();
    return (
        <Pressable onPress={toggleSwitch} hitSlop={8}>
            <Ionicons
                name={theme === "dark" ? "moon" : "sunny"}
                size={22}
                color={colors.textMain}
            />
        </Pressable>
    )
}

export default ThemeToggleButton
