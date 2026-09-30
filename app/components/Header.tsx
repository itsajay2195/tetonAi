import { Text, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import ThemeToggleButton from "./ThemeToggleButton";
import { useState } from "react";
import { SearchBar } from "./Searchbar";

type Props = {
    title?: string;
    showSearch?: boolean;
    searchQuery?: string;
    onSearchQueryChange?: (text: string) => void;
};

export function Header({ title, showSearch, searchQuery, onSearchQueryChange }: Props) {
    const { colors, theme, toggleTheme } = useTheme();
    const [isEnabled, setIsEnabled] = useState(theme === "dark");
    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 0, height: 60, marginTop: 50, paddingHorizontal: 10, gap: 10 }}>
            {title ? <Text>
                {title}
            </Text> : null}
            {showSearch && (
                <SearchBar value={searchQuery ?? ""} onChangeText={onSearchQueryChange ?? (() => { })} />
            )}
            <ThemeToggleButton isEnabled={isEnabled} toggleSwitch={toggleTheme} />
        </View>
    );
}