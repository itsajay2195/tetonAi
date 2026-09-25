import Constants from "expo-constants";

export const getBaseUrl = () => {
    const hostUri = Constants.expoConfig?.hostUri; // e.g. "192.168.0.107:8081"
    const host = hostUri?.split(":")[0] ?? "localhost";
    return `http://${host}:3333`;
};
