import { TextInput, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import ThemeToggleButton from "./ThemeToggleButton";
import { useState } from "react";

type Props = {
    showSearch?: boolean;
    searchQuery?: string;
    onSearchQueryChange?: (text: string) => void;
};

export function Header({ showSearch, searchQuery, onSearchQueryChange }: Props) {
    const { colors, theme, toggleTheme } = useTheme();
    const [isEnabled, setIsEnabled] = useState(theme === "dark");
    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: colors.bg }}>
            {showSearch && (
                <TextInput value={searchQuery} onChangeText={onSearchQueryChange} />
            )}
            <ThemeToggleButton isEnabled={isEnabled} toggleSwitch={toggleTheme} />
        </View>
    );
}