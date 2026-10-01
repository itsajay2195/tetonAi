import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import ThemeToggleButton from "./ThemeToggleButton";
import { SearchBar } from "./Searchbar";
import { useThemedStyles } from "../hooks/useThemedStyles";

type Props = {
    title?: string;
    showSearch?: boolean;
    searchQuery?: string;
    onSearchQueryChange?: (text: string) => void;
};

export function Header({ title, showSearch, searchQuery, onSearchQueryChange }: Props) {
    const { theme, toggleTheme } = useTheme();
    const isEnabled = theme === "dark";
    const styles = useThemedStyles(createHeaderStyles);
    return (
        <View style={styles.container}>
            {title ? <Text>
                {title}
            </Text> : null}
            {showSearch && (
                <SearchBar value={searchQuery ?? ""} onChangeText={onSearchQueryChange ?? (() => { })} />
            )}
            <ThemeToggleButton />
        </View>
    );
}

function createHeaderStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 60,
            marginTop: 50,
            paddingHorizontal: 10,
            gap: 10,
            backgroundColor: colors.bg,
        },
    });
}


