import { Modal, View, Pressable } from "react-native";
import { ReactNode } from "react";
import { useThemedStyles } from "../hooks/useThemedStyles";
import { useTheme } from "../theme/ThemeContext";
import { StyleSheet } from "react-native";
import { tokens } from "../theme/colors";

type Props = {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;
};

export function BottomSheet({ visible, onClose, children }: Props) {
    const styles = useThemedStyles(createBottomSheetStyles);

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <Pressable style={styles.backdrop} onPress={onClose} />
            <View style={styles.sheet}>
                <View style={styles.handle} />
                {children}
            </View>
        </Modal>
    );
}

function createBottomSheetStyles(colors: ReturnType<typeof useTheme>["colors"]) {
    return StyleSheet.create({
        backdrop: {
            ...StyleSheet.absoluteFill,
            backgroundColor: colors.overlay,
        },
        sheet: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.card,
            borderTopLeftRadius: tokens.borderRadius.lg,
            borderTopRightRadius: tokens.borderRadius.lg,
            padding: tokens.spacing.lg,
            maxHeight: "80%",
        },
        handle: {
            width: 40,
            height: 4,
            borderRadius: tokens.borderRadius.full,
            backgroundColor: colors.border,
            alignSelf: "center",
            marginBottom: tokens.spacing.md,
        },
    });
}
