// hooks/useThemedStyles.ts
import { useMemo } from "react";
import { useTheme } from "../theme/ThemeContext";

type Colors = ReturnType<typeof useTheme>["colors"];

export function useThemedStyles<T>(createStyles: (colors: Colors) => T): T {
    const { colors } = useTheme();
    return useMemo(() => createStyles(colors), [colors]);
}
