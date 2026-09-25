import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

const generateNewClientId = async () => {
    const newClientId = Crypto.randomUUID();
    await AsyncStorage.setItem('clientId', newClientId);
    return newClientId;
}
export const getClientId = async () => {
    const value = await AsyncStorage.getItem('clientId');
    if (value !== null) {
        return value;
    }
    const newClientId = await generateNewClientId();
    return newClientId;
}